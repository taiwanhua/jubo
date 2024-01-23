import type { FC, PropsWithChildren } from "react";
import { useMemo, memo, useCallback, Fragment } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSx, type SX } from "@/src/hooks/theme/useSx";
import { Dialog } from "@/src/components/dialogs/Dialog";
import { useIsOpenDialog } from "@/src/hooks/components/dialogs/useIsOpenDialog";
import type { PatientWithOrders } from "@/src/api/interface/patient.interface";
import { OrderForm } from "@/src/components/reactHookForm/forms/OrderForm/OrderForm";
import { useSnackbarAlert } from "@/src/hooks/alerts/useSnackbarAlert";
import { validationSchema } from "@/src/components/reactHookForm/forms/OrderForm/validationSchemas/validationSchema";
import { OrdersApi } from "@/src/api/class/ordersApi";
import { SnackbarAlert } from "@/src/components/alerts/SnackbarAlert";
import { useEditOrderStore } from "@/src/zustand/store";
import { usePatientWithOrders } from "@/src/api/swr/usePatientWithOrders";

export interface OrderListProps {
  sx?: SX;
}

const OrderListFC: FC<PropsWithChildren<OrderListProps>> = ({ sx }) => {
  const { isValidating, patientWithOrders, mutatePatientWithOrders, error } =
    usePatientWithOrders();

  const { resetEditOrderStore, editOrderIndex, isAdding } = useEditOrderStore();

  const ordersApi = useMemo(() => new OrdersApi(), []);

  const { showSnackbarAlert, snackbarAlertProps } = useSnackbarAlert();

  const { isDialogOpen, handleDialogOpen, handleDialogClose } =
    useIsOpenDialog();

  const onDialogClose = useCallback(() => {
    handleDialogClose(() => {
      resetEditOrderStore();
    });
  }, [handleDialogClose, resetEditOrderStore]);

  const methods = useForm<PatientWithOrders>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });
  const onSubmit = useCallback<SubmitHandler<PatientWithOrders>>(
    async (data) => {
      if (editOrderIndex === -1) {
        return;
      }

      const res = isAdding
        ? await ordersApi.ordersWithPatientPost({
            patientId: data.id,
            message: data.orders[0]?.message ?? "", // must exist
          })
        : await ordersApi.ordersIdPut(data.orders[editOrderIndex]?.id ?? "", {
            message: data.orders[editOrderIndex]?.message ?? "", // must exist
          });

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- catch error
      if (!res.data) {
        showSnackbarAlert({
          message: "更新醫囑失敗",
          severity: "error",
        });
        return;
      }

      showSnackbarAlert({
        message: "更新醫囑成功",
        severity: "success",
      });

      await mutatePatientWithOrders();
      resetEditOrderStore();
      onDialogClose();
    },
    [
      editOrderIndex,
      isAdding,
      mutatePatientWithOrders,
      onDialogClose,
      ordersApi,
      resetEditOrderStore,
      showSnackbarAlert,
    ],
  );

  const cardSx = useSx(
    () => [
      {
        textAlign: "center",
        padding: 1,
        margin: "2rem auto",
        width: "calc(100vw - 6rem)",
        height: "calc(100vh - 6rem)",
        borderColor: (theme) => theme.palette.grey[500],
      },
      sx,
    ],
    [sx],
  );

  const listSx = useSx(
    () => [
      {
        width: "100%",
        margin: "2rem auto",
        maxWidth: "20rem",
        bgcolor: "background.paper",
      },
      sx,
    ],
    [sx],
  );

  if (isValidating) {
    return (
      <Card sx={cardSx}>
        <Typography component="h3" variant="h3">
          照護長者名單暨醫囑歷史紀錄
        </Typography>
        Loading...
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={cardSx}>
        <Typography component="h3" variant="h3">
          照護長者名單暨醫囑歷史紀錄
        </Typography>
        {error.message}
      </Card>
    );
  }

  return (
    <>
      <Card sx={cardSx}>
        <Typography component="h3" variant="h3">
          照護長者名單暨醫囑歷史紀錄
        </Typography>
        <List sx={listSx}>
          {(patientWithOrders ?? []).map((patientWithOrder) => (
            <Fragment key={patientWithOrder.id}>
              <ListItem
                secondaryAction={
                  <Tooltip title={`檢視 ${patientWithOrder.name} 醫囑歷史紀錄`}>
                    <IconButton
                      onClick={() => {
                        methods.reset(patientWithOrder);
                        handleDialogOpen();
                      }}
                    >
                      <CommentIcon />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText primary={`名字 : ${patientWithOrder.name}`} />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Card>
      <Dialog
        actionsComponent={<Button onClick={onDialogClose}>關閉視窗</Button>}
        content={
          <OrderForm
            methods={methods}
            onSubmit={onSubmit}
            sx={{ maxHeight: "50vh", overflow: "auto" }}
          />
        }
        disableBackdropClick
        onClose={onDialogClose}
        open={isDialogOpen}
        title="醫囑歷史紀錄"
      />

      <SnackbarAlert {...snackbarAlertProps} />
    </>
  );
};

export const OrderList = memo(OrderListFC);
