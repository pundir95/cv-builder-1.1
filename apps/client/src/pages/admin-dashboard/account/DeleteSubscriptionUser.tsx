import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@reactive-resume/ui';
import { Button } from '@reactive-resume/ui';
import { Trash } from '@phosphor-icons/react';
import { axios } from '@/client/libs/axios';

interface DeleteSubscriptionUserProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
  id: string;
  text: string;
  isLoading: boolean;
}

export const DeleteSubscriptionUser = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  userName = 'this user',
  id,
  text
}: DeleteSubscriptionUserProps) => {

 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash className="h-5 w-5" />
            {text} User
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to {text} {userName}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="error"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : text}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
