
import * as React from "react";
import { type ToastActionElement, type ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

function toastReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId === undefined) {
        return {
          ...state,
          toasts: state.toasts.map((t) => ({
            ...t,
            open: false,
          })),
        };
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        ),
      };
    }

    case "REMOVE_TOAST": {
      const { toastId } = action;

      if (toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      };
    }
  }
}

function useToast() {
  const [state, dispatch] = React.useReducer(toastReducer, {
    toasts: [],
  });

  React.useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    state.toasts.forEach((toast) => {
      if (toast.open === false) {
        timeouts.push(
          setTimeout(() => {
            dispatch({
              type: "REMOVE_TOAST",
              toastId: toast.id,
            });
          }, TOAST_REMOVE_DELAY)
        );
      }
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [state.toasts]);

  const toast = React.useMemo(
    () => ({
      ...state,
      toast: (props: Omit<ToasterToast, "id">) => {
        const id = genId();
        const newToast = { id, ...props, open: true };
        
        dispatch({
          type: "ADD_TOAST",
          toast: newToast,
        });

        return id;
      },
      update: (props: Partial<ToasterToast>) => {
        dispatch({
          type: "UPDATE_TOAST",
          toast: props,
        });
      },
      dismiss: (toastId?: string) => {
        dispatch({
          type: "DISMISS_TOAST",
          toastId,
        });
      },
      remove: (toastId?: string) => {
        dispatch({
          type: "REMOVE_TOAST",
          toastId,
        });
      },
    }),
    [state]
  );

  return toast;
}

export { useToast };

// For convenience - toast is a function that shows a toast notification
export const toast = (props: Omit<ToasterToast, "id">) => {
  const { toast: showToast } = useToast();
  return showToast(props);
};
