import { IStackStyles, Stack, TextField } from '@fluentui/react';
import * as React from 'react';
import { IconButton } from '@fluentui/react/lib/Button';


interface IListItemProps {
   item: { Id: number; Title: string; Age: number };
   updateItem: (itemId: number) => Promise<void>;
   deleteItem: (itemId: number) => Promise<void>;
}

const stackStyles: IStackStyles = {
   root: {
      border: "1px solid #ddd",
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: "#f5f5f5",
   },
};

const labelStyles: IStackStyles = {
   root: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
   },
};

const textStyles: IStackStyles = {
   root: {
      fontSize: "18px",
      color: "#333",
      fontWeight: "normal",
   },
};

const textFieldStyles = {
   root: {
      marginBottom: "10px",
   },
};

const iconButtonStyles = {
   root: {
      color: "#0078d4",
      selectors: {
         ":hover": {
            color: "#004578",
         },
      },
   },
};

export const ListItem = (props: IListItemProps) => {
   const { item } = props;
   return (
      <Stack horizontal tokens={{ childrenGap: "5px" }} verticalAlign='center' styles={stackStyles}>
         <Stack.Item styles={labelStyles}>Title:</Stack.Item>
         <Stack.Item styles={textStyles}>{item.Title}</Stack.Item>
         <Stack.Item styles={labelStyles}>Age:</Stack.Item>
         <Stack.Item styles={textStyles}>{item.Age}</Stack.Item>
         <IconButton iconProps={{ iconName: "Edit" }} onClick={() => { props.updateItem(item.Id) }} styles={iconButtonStyles} />
         <IconButton iconProps={{ iconName: "Delete" }} onClick={() => { props.deleteItem(item.Id) }} styles={iconButtonStyles} />
      </Stack>
   );
};

export const CustomTextField = (props: any) => {
   return <TextField {...props} styles={textFieldStyles} />;
};

