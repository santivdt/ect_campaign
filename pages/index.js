import styles from "./index.module.scss"
import { useState } from "react"

export default function Home() {
  const [amountToSpend, setAmountToSpend] = useState(20000)
  const [items, setItems] = useState({
    1: { title: "Tesla", price: 1000, amount: 0, img: "./tesla.jpeg" },
    2: { title: "Airpod", price: 200, amount: 0, img: "./airpod.png" },
    3: { title: "Een eiland", price: 300, amount: 0, img: "islan.png" },
    4: { title: "10000 koeien", price: 400, amount: 0, img: "cow.png" },
  })

  const reset = () => {
    setAmountToSpend(20000)
    const copyOfItems = items
    Object.keys(copyOfItems).map(keyName => {
      copyOfItems[keyName].amount = 0
    })
    setItems(copyOfItems)
  }

  const buy = (theOne, price) => {
    setAmountToSpend(prevAmount => prevAmount - price)
    const copyOfItems = items
    Object.keys(copyOfItems).map(keyName => {
      keyName === theOne
        ? (copyOfItems[keyName].amount += 1)
        : copyOfItems[keyName].amount
    })
    setItems(copyOfItems)
  }

  const sell = (theOne, price) => {
    setAmountToSpend(prevAmount => prevAmount + price)
    const copyOfItems = items
    Object.keys(copyOfItems).map(keyName => {
      keyName === theOne
        ? (copyOfItems[keyName].amount -= 1)
        : copyOfItems[keyName].amount
    })
    setItems(copyOfItems)
  }
  return (
    <>
      <h1>&euro;{amountToSpend}</h1>
      <button className="btn" onClick={reset}>
        Reset
      </button>
      <div className={styles.container}>
        {Object.keys(items).map(keyName => (
          <div className={styles.item} key={keyName}>
            <div className={styles.item__image}>
              <img src={items[keyName].img} className={styles.image} />
            </div>
            <div className={styles.item__content}>
              <div className={styles.item__content_title}>
                <h1>{items[keyName].title}</h1>
                <h3> &euro;{items[keyName].price}</h3>
              </div>
              <div className={styles.item__content_function}>
                <button
                  disabled={items[keyName].amount === 0}
                  onClick={() => sell(keyName, items[keyName].price)}
                  className="btn sell"
                >
                  -
                </button>
                <span>{items[keyName].amount}</span>
                <button
                  className="btn buy"
                  onClick={() => buy(keyName, items[keyName].price)}
                  disabled={items[keyName].price > amountToSpend}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
