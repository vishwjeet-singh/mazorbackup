const RadioButton = () => {
    return(
        <div className='radio-btn'>
            <label class="radio">
                <span class="radio__input">
                    <input type="radio" name="radio" />
                    <span class="radio__control"></span>
                </span>
                <span class="radio__label">Select Mode</span>
            </label>

            <label class="radio">
                <span class="radio__input">
                    <input type="radio" name="radio" />
                    <span class="radio__control"></span>
                </span>
                <span class="radio__label">Draw Mode</span>
            </label>
        </div>
    )
}
export default RadioButton