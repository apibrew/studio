import {MouseEvent} from 'react'

export class TableResize {
    private property: string = '';
    private startX: number = 0;
    private width: number = 0;
    private onResizeListener: (property: string, width: number) => void = () => void 0;

    constructor() {
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
    }

    renderResizeDiv(property: string) {
        return <div className='resize-div'
                    onMouseDown={this.onMouseDown.bind(this, property)}
        />
    }

    onMouseDown(property: string, e: MouseEvent<HTMLDivElement>) {
        this.property = property
        this.startX = e.clientX

        const target = document.querySelector(`.property-th[property='${property}']`) as HTMLElement

        if (!target) {
            console.log('no target')
            return
        }

        this.width = target.clientWidth

        e.preventDefault()

        // @ts-ignore
        document.addEventListener('mousemove', this.onMouseMove)
        // @ts-ignore
        document.addEventListener('mouseup', this.onMouseUp)
    }

    onMouseUp(_: MouseEvent) {
        // @ts-ignore
        document.removeEventListener('mousemove', this.onMouseMove)
        // @ts-ignore
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
