import {Resource} from "@apibrew/react";
import React from "react";
import {Schema} from "../../../types/schema";

export class TableResize {
    private property: string = '';
    private startX: number = 0;
    private width: number = 0;
    private onResizeListener: (property: string, width: number) => void = () => void 0;

    constructor(private resource: Schema, private properties: string[]) {
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
    }

    renderResizeDiv(property: string) {
        return <div className='resize-div'
                    onMouseDown={this.onMouseDown.bind(this, property)}
        />
    }

    onMouseDown(property: string, e: React.MouseEvent<HTMLDivElement>) {
        this.property = property
        this.startX = e.clientX

        const target = document.querySelector(`.property-th[property='${property}']`) as HTMLElement

        if (!target) {
            console.log('no target')
            return
        }

        this.width = target.clientWidth

        e.preventDefault()

        document.addEventListener('mousemove', this.onMouseMove)
        document.addEventListener('mouseup', this.onMouseUp)
    }

    onMouseUp(e: MouseEvent) {
        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    onMouseMove(e: MouseEvent) {
        const newWidth = this.width + e.clientX - this.startX
        this.onResizeListener(this.property, Math.max(100, newWidth))
    }

    onResize(listener: (property: string, width: number) => void) {
        this.onResizeListener = listener
    }
}
