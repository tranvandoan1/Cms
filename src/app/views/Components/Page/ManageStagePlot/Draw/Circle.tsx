import { Fragment, useEffect, useRef } from "react"
import { Circle,Transformer } from "react-konva"


const Circ = ({shapeProps, isSelected, onSelect, onChange}:any) =>{
    const shapeRef = useRef<any>()
    const trRef = useRef<any>()
    useEffect(() =>{
        if(isSelected){
            trRef.current.setNode(shapeRef.current)
            trRef.current.getLayer().batchDraw()
        }
    },[isSelected])
    return(
        <Fragment>
            <Circle
                onClick={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e:any)=>{
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y()
                    })
                }}
                onTransformEnd={(e:any)=>{
                    const node = shapeRef.current
                    const scaleX = node.scaleX()
                    const scaleY  = node.scaleY()
                    node.scaleX(1)
                    node.scaleY(1)
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * scaleX,
                        height:  node.height() *  scaleY
                    })
                }}
            />
            {isSelected && <Transformer ref={trRef} />}
        </Fragment>
    )
}

export default Circ