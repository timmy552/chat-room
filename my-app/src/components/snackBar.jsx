import React, { useState, forwardRef, useImperativeHandle } from 'react'
import "./snackBar.css"

const SnackBar = forwardRef((props, ref) => {
    const [showSnacBar, setshowSnacBar] = useState(false)
    useImperativeHandle(ref, () =>({
        show(){
            setshowSnacBar(true)
            setTimeout( () => {
                setshowSnacBar(false)
            }, 3000)

        }
    }))
  return (
    <div>
        <div className="snackbar" id={showSnacBar ? "show" : "hide"} style={{backgroundColor: props.type === "success" ? "#00F593" : "#FF0033"}}>
            <div className="symbol">
         {props.type === "success" ? <h2>&#x2713;</h2> : <h2>&#x2613;</h2>}
            </div>
                <div className="message">{props.message}</div>
        </div>

    </div>
  )
})

export default SnackBar