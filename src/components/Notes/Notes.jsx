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
import { Wrapper,Container,Form,Input,Button,Item,ButtonDelete,NewItem,TitleInput,Textarea,AddButton,addHover } from './styles';


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
          {...searchInput.bind}
          // value={searchInput.bind.value}
          // onChange={(e) => searchInput.bind.onChange(e)}
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
                    color:'white'
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
                    color:'white'
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
