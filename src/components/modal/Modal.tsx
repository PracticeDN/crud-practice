import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { Button, Input, InputSection, Label } from "../common/commonUI";
import useOnChange from "../../hooks/useOnChange";
import useUpdateProduct from "../../hooks/useUpdateProduct";

interface IProps {
  product: IProduct;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  fetchData: () => void;
}

function Modal({ product, setShowModal, fetchData }: IProps): JSX.Element {
  const [values, setValues] = useState<IValue>({
    product: product.product,
    price: product.price,
  });
  const { handleChange } = useOnChange({ setValues });
  const id = product.id;
  const { handleUpdateProduct } = useUpdateProduct({
    id,
    values,
    fetchData,
    setShowModal,
  });

  return (
    <React.Fragment>
      <ModalOverlay
        onClick={() => {
          setShowModal(false);
        }}
      />
      <ModalContainer onSubmit={handleUpdateProduct}>
        <ModalTitle>수정</ModalTitle>

        <EditInputSection>
          <Label>상품</Label>
          <Input
            name="product"
            value={values.product}
            onChange={handleChange}
          />
        </EditInputSection>

        <EditInputSection>
          <Label>가격</Label>
          <Input name="price" value={values.price} onChange={handleChange} />
        </EditInputSection>

        <EditButton>수정</EditButton>
      </ModalContainer>
    </React.Fragment>
  );
}

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.3;
`;

const ModalContainer = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  background-color: white;
  padding: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
`;

const EditInputSection = styled(InputSection)`
  margin-top: 2rem;
`;

const EditButton = styled(Button)`
  margin-top: 2rem;
  background-color: #1677ff;
  width: 6rem;
  height: 3rem;
`;
