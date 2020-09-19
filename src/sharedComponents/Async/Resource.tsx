import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { Await, AwaitProps } from "./Await";

export interface ResourceState<T> {
    data: T | null
    error: any | null
    done: boolean
}

export interface ResourceListener<T> extends RefObject<Dispatch<SetStateAction<ResourceState<T>>>> { }

export class Resource<T> {
    protected state = { data: null, error: null, done: false } as ResourceState<T>
    protected listeners = {} as Record<string, ResourceListener<T>>
    protected id = 0
    public Await: React.FC<Omit<AwaitProps<T>, "resource">> = (props) => {
        return <Await<T> {...props} resource={this} />
    }

    public getState() {
        return this.state
    }

    public addListener(callback: ResourceListener<T>) {
        let id = this.id++
        this.listeners[id] = callback
        return id.toString()
    }

    public removeListener(id: string) {
        delete this.listeners[id]
    }

    constructor(protected promise: Promise<T>) {
        promise.then((value) => {
            this.state.data = value
            this.state.done = true
            Object.values(this.listeners).forEach((v) => v.current != null && v.current({ ...this.state }))
        }, (error) => {
            this.state.error = error
            this.state.done = true
            Object.values(this.listeners).forEach((v) => v.current != null && v.current({ ...this.state }))
        })
    }
}

export function useResource<T>(resource: Resource<T>) {
    let [state, setState] = useState({ ...resource.getState() })
    let callback = useRef(setState)

    useEffect(() => {
        let id = resource.addListener(callback)
        return () => {
            resource.removeListener(id)
        }
    })

    return state
}