import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/input";
import Button from "../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/util/validator";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { useForm } from "../../Shared/hooks/form-hook";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";
import { AuthContext } from "../../Shared/context/auth-context";
import "./PlaceForm.css";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image:{
        value: null,
        isValid: false,
      }
    },
    false
  );
  const navigate = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData =new FormData();
      formData.append('title',formState.inputs.title.value)
      formData.append('description',formState.inputs.description.value)
      formData.append('address',formState.inputs.address.value)
      formData.append('image',formState.inputs.image.value)
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        formData,
        {Authorization :'Bearer ' + auth.token }
      );
      navigate("/");
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
