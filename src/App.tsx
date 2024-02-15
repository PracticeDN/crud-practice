import { useEffect, useState } from "react";
import styled from "styled-components";
import { getProductsAllApi } from "./api/home";
import useOnChange from "./hooks/useOnChange";
import useHandleSubmit from "./hooks/useHandleSubmit";
import useDeleteProduct from "./hooks/useDeleteProduct";

function App() {
  const fetchData = async () => {
    const response = await getProductsAllApi();
    setProductData(response.data);
  };

  const [productData, setProductData] = useState<IProduct[]>([]);
  const [values, setValues] = useState<IValue>({
    product: "",
    price: "",
  });
  const { handleChange } = useOnChange({ setValues });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { handleDeleteProduct } = useDeleteProduct(fetchData);

  const { handleSubmit } = useHandleSubmit({ values, setValues, fetchData });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const newTotalPrice = productData.reduce((prev, current) => {
      return prev + Number(current.price);
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [productData]);

  return (
    <Body>
      <Main>
        <Title>장바구니</Title>

        <AddItemForm onSubmit={handleSubmit}>
          <InputWrapper>
            <InputSection>
              <Label>상품</Label>
              <Input
                name="product"
                value={values.product}
                onChange={handleChange}
                placeholder="상품명을 입력해주세요..."
              />
            </InputSection>

            <InputSection>
              <Label>비용</Label>
              <Input
                name="price"
                value={values.price}
                onChange={handleChange}
                placeholder="비용을 입력해주세요..."
              />
            </InputSection>
          </InputWrapper>

          <SubmitButton>제출</SubmitButton>
        </AddItemForm>

        <ProductList>
          {productData?.map((product) => (
            <Product key={product.id}>
              <ProductName>{product.product}</ProductName>
              <ProductPrice>{product.price}원</ProductPrice>
              <DeleteButton
                onClick={() => {
                  handleDeleteProduct(product.id);
                }}
              >
                삭제
              </DeleteButton>
            </Product>
          ))}
        </ProductList>
        <TotalPrice>{totalPrice}원</TotalPrice>
      </Main>
    </Body>
  );
}

export default App;

const Body = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  position: relative;
  width: 100rem;
  height: 50rem;
  padding: 2rem;
  background-color: white;
  border-radius: 2.5rem;
  box-shadow: 0 0 5px 0 #808080;
  overflow: auto;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 2rem;
`;

const AddItemForm = styled.form``;

const InputWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Label = styled.label`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #c6c6c6;
  outline: none;
`;

const Button = styled.button`
  border: none;
  color: white;
  border-radius: 1rem;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  background-color: #1677ff;
  font-size: 1.6rem;
  padding: 0.75rem 2rem;
`;

const ProductList = styled.ul`
  list-style-type: none;
`;

const Product = styled.li`
  position: relative;
  display: flex;
  margin-top: 1rem;
  border: 1px solid #c6c6c6;
  border-radius: 1rem;
  padding: 1rem;
`;

const ProductName = styled.p`
  font-size: 1.2rem;
  width: 50%;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: #aaaaaa;
`;

const DeleteButton = styled(Button)`
  background-color: #eb4a4a;
  padding: 0.75rem 1.5rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2rem;
`;

const TotalPrice = styled.p`
  position: absolute;
  font-size: 2.2rem;
`;
