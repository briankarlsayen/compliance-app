import { Grid } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import Select from "../common/Select";
interface ISelectInputProps {
  type?: number | null;
  centre: string;
  room: string;
}

interface ISelectProps {
  inputField: ISelectInputProps;
  setInputField: Dispatch<SetStateAction<ISelectInputProps>>;
}

export default function ReassignSelect(props: ISelectProps) {
  const { inputField, setInputField } = props;

  const typeList = [
    {
      id: 1,
      name: "Centre",
    },
    {
      id: 2,
      name: "Room",
    },
  ];

  const centreList = [
    {
      id: 1,
      name: "Test 1",
    },
    {
      id: 2,
      name: "Test 2",
    },
  ];
  const roomList = [
    {
      id: 1,
      name: "Room 1",
    },
    {
      id: 2,
      name: "Room 2",
    },
  ];

  const propsCentreContainer = {
    label: "Centre",
    id: "centre",
    value: inputField.centre!,
    itemValueKey: "id",
    items: centreList,
    onChange: (e: any) => setInputField({ ...inputField, centre: e.id }),
    itemLabelKey: "name",
  };

  const propsRoomContainer = {
    label: "Room",
    id: "room",
    value: inputField.room!,
    itemValueKey: "id",
    items: roomList,
    onChange: (e: any) => setInputField({ ...inputField, room: e.id }),
    itemLabelKey: "name",
  };

  const propsTypeContainer = {
    label: "Type",
    id: "type",
    value: inputField.type!,
    itemValueKey: "id",
    items: typeList,
    onChange: (e: any) => setInputField({ ...inputField, type: e.id }),
    itemLabelKey: "name",
  };

  return (
    <Grid container gap={2}>
      <Grid item xs={3} md={3}>
        <Select {...propsTypeContainer} />
      </Grid>
      <Grid item xs={3} md={3}>
        <Select {...propsCentreContainer} />
      </Grid>
      {inputField.type && inputField.type === 2 && (
        <Grid item xs={3} md={3}>
          <Select {...propsRoomContainer} />
        </Grid>
      )}
    </Grid>
  );
}
