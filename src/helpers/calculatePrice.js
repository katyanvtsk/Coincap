export const calculateWallet = (wallet, assets) => {
  //стоимость портефля на момент покупки
  const firstPrice = wallet.reduce((acc, item) => acc + item.allPrice, 0);

  //текущая стоимость
  let currentPrice = 0;
  for (const item of wallet) {
    const crypto = assets.find((cr) => cr.id === item.id);
    if (crypto) {
      const price = parseFloat(crypto.priceUsd);
      currentPrice += price * item.quantity;
    }
  }

  //разница
  const change = currentPrice - firstPrice;
  // разница в %
  const percent = (change / firstPrice) * 100;

  return { firstPrice, currentPrice, change, percent };
};
