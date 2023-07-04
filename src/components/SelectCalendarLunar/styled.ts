import styled from 'styled-components';

export const WrapperSelect = styled.div`
  width: max(350px, 100%);
  position: relative;
  .icon-date-select{
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #909090;
  }
`

export const InputDatePicker = styled.input`
  padding: 10px 5px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #909090;
  font-size: 1rem;
  line-height: 1.3rem;
  color: black;
  width: -webkit-fill-available;
  &:hover, &:focus {
    border: 1px solid #000;
    cursor: pointer;
    .icon-date-select{
      color: #000;
    }
  }
`

export const Modal = styled.div`
  position: absolute;
  z-index: 999;
  width: 100%;
  top: 50px;
`