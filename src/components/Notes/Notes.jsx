import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { useInput } from "./../../hooks/useInput";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNotes } from "Redux/Reducers/notes-reducer";

const Wrapper = styled.div`
  width: 760px;
  margin: 0 auto;
  @media only screen and (max-width: 760px) {
    width: 100%;
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  margin: 0 auto;
`;
const Input = styled.input`
  display: flex;
  width: 70%;
  height: 100%;
  border-radius: 5px;
  outline: 1px solid black;
  border: 0;
  padding: 0 15px;
`;
const Button = styled.button`
  width: 20%;
  height: 100%;
  border: 0;
  margin: 0;
  outline: 1px solid black;
  background: transparent;
  border-radius: 5px;
  margin-left: 15px;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background: rgba(140, 140, 140, 0.3);
  }
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  gap: 10px;
  margin-top: 20px;
  grid-template-columns: repeat(3, 33%);
  @media only screen and (max-width: 760px) {
    grid-template-columns: repeat(2, 46%);
    width: 96%;
    place-content: center;
  }
`;
const Item = styled.div`
  width: 100%;
  border-radius: 10px;
  background: #d78045;
  position: relative;
  @media only screen and (max-width: 760px) {
    min-height: 140px;
  }
`;
const NewItem = styled(Item)`
  background: #6b8e6e;
  padding: 10px 0px;
  @media only screen and (max-width: 760px) {
    padding: 0;
  }
`;
const Textarea = styled.textarea`
  height: 30px;
  padding: 5px;
  resize: none;
  overflow: hidden;
  min-height: 50px;
  height: 60%;
  width: 87%;
  background: transparent;
  color: white;
  outline: 0;
  border: 0;
  font-family: -apple-system, "SF Pro", sans-serif;
  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  @media only screen and (max-width: 660px) {
    width: 81%;
  }
`;
const AddButton = styled.button`
  background: transparent;
  outline: 0;
  cursor: pointer;
  border: 0;
  display: inline-block;
  right: 0px;
  bottom: 5px;
  position: absolute;
`;
const addHover = {
  color: "white",
  transition: ".1s ease",
  "&:hover": {
    color: "rgb(220,220,220)",
  },
};
const TitleInput = styled.input`
  color: white;
  background: transparent;
  border: 0;
  font-size: 18px;
  outline: 0;
  padding: 4px 5px 0;
  width: 90%;
  margin-bottom: 2px;
  &::placeholder {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
  }
`;
// const Button = styled.button`
//   right:0;
//   top:0;
//   position:absolute;
//   background:white;
// `
const ButtonDelete = styled.button`
  right: 2px;
  top: 2px;
  outline: 0;
  border: 0;
  position: absolute;
  background: transparent;
  padding: 0;
  cursor: pointer;
  @media only screen and (max-width: 760px) {
  }
`;

const Notes = (props) => {
  const textarea = useInput();
  const searchInput = useInput();
  const titleInput = useInput();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Form>
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchInput.bind.value}
          onChange={(e) => searchInput.bind.onChange(e)}
        />
        <Button onClick={(e) => e.preventDefault()}>
          <SearchIcon />
        </Button>
      </Form>
      <Container>
        {props.notes != undefined &&
          props.notes
            .filter((el) =>
              el.noteTitle
                .toLowerCase()
                .includes(searchInput.bind.value.toLowerCase())
            )
            .map((note) => (
              <Item>
                <p
                  style={{
                    fontSize: "19px",
                    letterSpacing: "1px",
                    maxWidth: "97%",
                    margin: "2px 5px 7px",
                  }}
                >
                  {note.noteTitle}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    letterSpacing: "1px",
                    maxWidth: "83%",
                    margin: "2px 5px 5px",
                    padding: "0 2px",
                  }}
                >
                  {note.noteText}
                </p>
                <ButtonDelete onClick={() => props.deleteNote(note.id)}>
                  <ClearIcon
                    sx={{
                      color: "white",
                      transition: ".1s ease",
                      "&:hover": { color: "rgb(220,220,220)" },
                    }}
                  />
                </ButtonDelete>
              </Item>
            ))}
        <NewItem>
          <TitleInput
          autoFocus
            type="text"
            placeholder="Write a title..."
            {...titleInput.bind}
          />
          <Textarea
            type="text"
            placeholder="Write a note..."
            {...textarea.bind}
          />
          <AddButton
            onClick={() => {
              props.addNote(titleInput.bind.value, textarea.bind.value);
              titleInput.clear();
              textarea.clear();
              dispatch(
                setNotes({
                  text: textarea.bind.value,
                  title: titleInput.bind.value,
                })
              );
            }}
          >
            <AddCircleIcon sx={addHover} />
          </AddButton>
        </NewItem>
      </Container>
    </Wrapper>
  );
};

export default Notes;
