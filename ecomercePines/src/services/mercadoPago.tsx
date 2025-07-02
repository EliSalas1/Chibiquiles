
export const createPayment = async (products: {
  title: string;
  unit_price: number;
  quantity: number;
}[]) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/create_payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: products }), // envia items, no product único
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear el pago');
    }

    const data = await response.json();
    return data.payment_url;
  } catch (error: any) {
    console.error('Error en createPayment:', error.message);
    throw error;
  }
};
