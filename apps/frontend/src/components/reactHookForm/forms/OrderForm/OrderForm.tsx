import type { FC } from "react";
import { Fragment, memo, useCallback } from "react";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormProvider, useFieldArray } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import type { PatientWithOrders } from "@/src/api/interface/patient.interface";
import { TextField } from "@/src/components/reactHookForm/fields/TextField/TextField";
import { useEditOrderStore } from "@/src/zustand/store";

const newOrder = {
  id: "add",
  message: "",
  created_user: "SYSTEM",
  created_date: new Date(),
  updated_user: "SYSTEM",
  updated_date: new Date(),
};

export interface OrderFormProps {
  sx?: BoxProps["sx"];
  onSubmit: SubmitHandler<PatientWithOrders>;
  methods: UseFormReturn<PatientWithOrders>;
  disabled?: boolean;
}

const OrderFormFC: FC<OrderFormProps> = ({
  sx,
  onSubmit,
  methods,
  disabled,
}) => {
  const {
    editOrderIndex,
    setEditOrderIndex,
    resetEditOrderStore,
    isAdding,
    isEditing,
    setIsAdding,
    setIsEditing,
  } = useEditOrderStore();

  const { fields, prepend, remove } = useFieldArray({
    control: methods.control,
    name: "orders",
  });

  const onCancelClick = useCallback(() => {
    if (isAdding) {
      remove(0);
    }
    methods.reset();
    resetEditOrderStore();
  }, [isAdding, methods, remove, resetEditOrderStore]);

  const onAddClick = useCallback(() => {
    prepend(newOrder);
    setEditOrderIndex(0);
    setIsAdding(true);
  }, [prepend, setEditOrderIndex, setIsAdding]);

  return (
    <FormProvider {...methods}>
      <Box
        autoComplete="off"
        component="form"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={sx}
      >
        <Grid container minWidth={480} spacing={3}>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <Grid item xs={10}>
                <TextField
                  disabled={disabled || editOrderIndex !== index}
                  fullWidth
                  label="醫生叮囑"
                  maxRows={3}
                  minRows={3}
                  multiline
                  name={`orders.${index}.message`}
                />
              </Grid>

              <Grid item xs={2}>
                {(isAdding || isEditing) && editOrderIndex === index ? (
                  <>
                    <Tooltip title="取消">
                      <IconButton color="warning" onClick={onCancelClick}>
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="儲存">
                      <IconButton
                        color="success"
                        onClick={methods.handleSubmit(onSubmit)}
                      >
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : null}

                {index === 0 && !isAdding && !isEditing ? (
                  <Tooltip title="新增醫囑紀錄">
                    <IconButton color="info" onClick={onAddClick}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                ) : null}

                {!isAdding && !isEditing ? (
                  <Tooltip title="編輯醫囑紀錄">
                    <IconButton
                      color="success"
                      onClick={() => {
                        setEditOrderIndex(index);
                        setIsEditing(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                ) : null}
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Box>
    </FormProvider>
  );
};

export const OrderForm = memo(OrderFormFC);
