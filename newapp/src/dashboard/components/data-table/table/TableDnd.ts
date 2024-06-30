import {DragEvent} from "react";
import {getTargetColumn} from "./util";
import {Schema} from "../../../../types/schema";

export class TableDnd {
    private ec: {
        [key: string]: number
    };
    private onReorderPropertiesListener?: (updatedProperties: string[]) => void;

    constructor(private resource: Schema, private properties: string[]) {
        this.ec = {}

        this.reset()
    }

    private reset() {
        document.querySelectorAll(".drag-over").forEach(el => el.classList.remove("drag-over"))
        this.ec = {}

        for (const property in this.resource.properties) {
            this.ec[property] = 0
        }
    }

    locateColumn(e: DragEvent) {
        const propertyName = this.getTarget(e)?.attributes.getNamedItem("property")!.value

        if (!propertyName) {
            throw new Error("Property not found")
        }

        return propertyName
    }

    onDragStart(e: DragEvent) {
        const propertyName = this.locateColumn(e);

        e.dataTransfer?.setData("text/plain", propertyName)

        this.getTarget(e)?.classList.add("dragging")
    }

    onDragEnd(e: DragEvent) {
        this.getTarget(e)?.classList.remove("dragging")
        this.reset();
    }

    private getTarget(e: DragEvent<Element>) {
        return getTargetColumn(e)
    }

    onDragOver(e: DragEvent) {
        e.preventDefault()
    }

    onDragEnter(e: DragEvent) {
        const target = this.getTarget(e)
        const column = this.locateColumn(e)

        this.ec[column]++;

        if (!target) {
            return
        }

        target.classList.add("drag-over")
    }

    onDragLeave(e: DragEvent) {
        const target = this.getTarget(e)
        const column = this.locateColumn(e)
        this.ec[column]--;

        if (!target) {
            return
        }

        if (this.ec[column] === 0) {
            target.classList.remove("drag-over")
        }
    }

    onDrop(e: DragEvent) {
        if (this.onReorderPropertiesListener) {
            // reorder properties

            const source = e.dataTransfer?.getData("text/plain")
            const target = this.locateColumn(e)

            if (!source || !target) {
                return
            }

            if (source === target) {
                return
            }

            const properties = this.properties.slice()

            const sourceIndex = properties.indexOf(source)

            if (sourceIndex === -1) {
                return
            }

            const targetIndex = properties.indexOf(target)

            if (targetIndex === -1) {
                return
            }

            properties.splice(sourceIndex, 1)

            properties.splice(targetIndex, 0, source)

            this.properties = properties
            this.onReorderPropertiesListener(properties)
        }
    }

    onReorderProperties(listener: (updatedProperties: string[]) => void) {
        this.onReorderPropertiesListener = listener
    }
}

/*
details, code, email
email, details, code
details, code, email


 */
