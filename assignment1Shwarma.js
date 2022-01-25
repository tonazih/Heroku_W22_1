const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TYPE:   Symbol("type"),
    DRINKS:  Symbol("drinks")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sType = "";
        this.sDrinks = "";
        this.sItem = "Seafood";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Nazih's Sea Food.");
                aReturn.push("What meal size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TYPE
                this.sSize = sInput;
                aReturn.push("What kind of fish would you like?");
                break;
            case OrderState.TYPE:
                this.stateCur = OrderState.DRINKS
                this.sType = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sItem} of ${this.sSize} ${this.sType}`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}