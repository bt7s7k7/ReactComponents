import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { Await, AwaitProps } from "./Await";

export interface ResourceState<T> {
    data: T | null
    error: any | null
    done: boolean
}

export interface ResourceListener<T> extends RefObject<Dispatch<SetStateAction<ResourceState<T>>>> { }

/**
 * Wrap a `Promise` with this class to use the `Await` component to wait for resolution or rejection. Use the `Await` property to get a preconfigured `Await` component ready to be used. 
 */
export class Resource<T> {
    protected state = { data: null, error: null, done: false } as ResourceState<T>
    protected listeners = {} as Record<string, ResourceListener<T>>
    protected id = 0
    /** An `Await` component with the type and resource already set */
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

/** Hook to get the data and ready state from a resource */
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