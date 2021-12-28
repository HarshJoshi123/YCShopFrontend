
const addToCart = (state, data) => {
    let dt = JSON.parse(JSON.stringify(data.data))
    let st = JSON.parse(JSON.stringify(state));
    if (st.items.find(prod => prod.productId == dt.productId)) {  //exists already so add to qty
        let i = st.items.findIndex(prod => prod.productId == dt.productId);
        st.items[i].quantity++;
        st.bill += dt.cost;
    }    
    else {
        st.items.push({
            name: dt.name,
            productId: dt.productId,
            quantity: 1,
            cost: dt.cost,
        })
        st.bill += dt.cost;
    }
    st.userId=dt.userId
    //console.log(st)
    return st
}


const subFromCart = (state, data) => {
    let st = JSON.parse(JSON.stringify(state));
    let dt = JSON.parse(JSON.stringify(data.data));

    if (st.items.find(prod => prod.productId == dt.productId).quantity == 1) {  //exists already so remove 
        st.items = st.items.filter(prod=>prod.productId !== dt.productId )
        st.bill -= dt.cost;
    }
    else {
        st.items.find(prod => prod.productId == dt.productId).quantity--;
        st.bill -= dt.cost;
    }
    st.userId=dt.userId;
    return st
}
export {
    addToCart,
    subFromCart
}