import styles from "./index.module.scss"
import { useState } from "react"

export default function Home() {
  const [amountToSpend, setAmountToSpend] = useState(20000)
  const [items, setItems] = useState([
    { title: "Tesla", price: 1000, amount: 0, img: "./tesla.jpeg" },
    { title: "Airpod", price: 200, amount: 0, img: "./airpod.png" },
    { title: "item 3", price: 300, amount: 0, img: "islan.png" },
    { title: "item 4", price: 400, amount: 0, img: "cow.png" },
  ])

  const reset = () => {
    setAmountToSpend(20000)

    const copyOfItems = items

    copyOfItems.forEach(item => {
      item.amount = 0
    })
    setItems(copyOfItems)
  }

  const buy = (index, price) => {
    const newAmountToSpend = amountToSpend - price
    setAmountToSpend(newAmountToSpend)
    const itemToChange = items[index]
    const copyAmount = items[index].amount + 1
    const newItem = { ...itemToChange, amount: copyAmount }
    const copyOfItems = [...items]
    copyOfItems[index] = newItem
    setItems(copyOfItems)
  }

  const sell = (index, price) => {
    const newAmountToSpend = amountToSpend + price
    setAmountToSpend(newAmountToSpend)
    const itemToChange = items[index]
    const newAmountItem = itemToChange.amount - 1
    const newItem = { ...itemToChange, amount: newAmountItem }
    const copyOfItems = [...items]
    copyOfItems[index] = newItem
    setItems(copyOfItems)
  }
  return (
    <>
      <h1>&euro;{amountToSpend}</h1>
      <button className="btn" onClick={reset}>
        Reset
      </button>
      <div className={styles.container}>
        {items.map(({ title, price, amount, img }, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.item__image}>
              <img src={img} className={styles.image} />
            </div>
            <div className={styles.item__content}>
              <div className={styles.item__content_title}>
                <h1>{title}</h1>
                <h3> &euro;{price}</h3>
              </div>
              <div className={styles.item__content_function}>
                <button
                  disabled={amount === 0}
                  onClick={() => sell(index, price)}
                  className="btn sell"
                >
                  Sell
                </button>
                <span>{amount}</span>
                <button className="btn buy" onClick={() => buy(index, price)}>
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
