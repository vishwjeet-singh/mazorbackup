import React from 'react'
import './advertisingRadioBtn.css'

const RadioBtn = () => {
    return(
        <div className='radio-btn'>
            <label class="radio">
                <span class="radio__input">
                    <input type="radio" name="radio" checked />
                    <span class="radio__control"></span>
                </span>
                <span class="radio__label">Home</span>
            </label>

            <label class="radio">
                <span class="radio__input">
                    <input type="radio" name="radio" />
                    <span class="radio__control"></span>
                </span>
                <span class="radio__label">Work</span>
            </label>

            <label class="radio">
                <span class="radio__input">
                    <input type="radio" name="radio" />
                    <span class="radio__control"></span>
                </span>
                <span class="radio__label">Movement</span>
            </label>
        </div>
    )
}
export default RadioBtn