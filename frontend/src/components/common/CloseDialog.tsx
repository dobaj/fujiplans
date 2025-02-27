import * as React from "react";
import { Dialog } from "@base-ui-components/react/dialog";

export default function CloseDialog({
  dialogOpen,
  setDialogOpen,
  setConfirmationOpen,
}: {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const [dialogOpen, setDialogOpen] = React.useState(false);
  // const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  // const [textareaValue, setTextareaValue] = React.useState('');

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
        Tweet
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70" />
        <Dialog.Popup className="fixed top-[calc(50%+1.25rem*var(--nested-dialogs))] left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 scale-[calc(1-0.1*var(--nested-dialogs))] rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[has-nested-dialogs]:after:absolute data-[has-nested-dialogs]:after:inset-0 data-[has-nested-dialogs]:after:rounded-[inherit] data-[has-nested-dialogs]:after:bg-black/5 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
          <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
            Are you sure you want to go back?
          </Dialog.Title>
          <form
            className="mt-4 flex flex-col gap-6"
            onSubmit={(event) => {
              event.preventDefault();
              // Close the dialog when submitting
              setDialogOpen(false);
              setConfirmationOpen(true);
            }}
          >
            <div className="flex justify-end gap-4">
              <Dialog.Close
                onClick={() => setDialogOpen(false)}
                className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100"
              >
                Cancel
              </Dialog.Close>
              <button
                type="submit"
                className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-red-500 px-3.5 text-base font-medium text-gray-100 select-none hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-red-700"
              >
                Go Back
              </button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
