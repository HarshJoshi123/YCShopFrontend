
const addToCart = (state, data) => {
    let dt = JSON.parse(JSON.stringify(data.data))
    let st = JSON.parse(JSON.stringify(state));
    if (st.items.find(prod => prod.productId == dt._id)) {  //exists already so add to qty
        let i = st.items.findIndex(prod => prod.productId == dt._id);
        st.items[i].quantity++;
        st.bill += dt.cost;
    }    
    else {
        st.items.push({
            name: dt.name,
            productId: dt._id,
            quantity: 1,
            cost: dt.cost,
        })
        st.bill += dt.cost;
    }
    //console.log(st)
    return st
}


const subFromCart = (state, data) => {
    let st = JSON.parse(JSON.stringify(state));
    let dt = JSON.parse(JSON.stringify(data.data));

    if (st.items.find(prod => prod.productId == dt._id).quantity == 1) {  //exists already so remove 
        st.items = st.items.filter(prod=>prod.productId !== dt._id )
        st.bill -= dt.cost;
    }
    else {
        st.items.find(prod => prod.productId == dt._id).quantity--;
        st.bill -= dt.cost;
    }
    return st
}
export {
    addToCart,
    subFromCart
}