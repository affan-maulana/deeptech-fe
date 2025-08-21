"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProfileForm } from "./ProfileForm";
import { UserData } from "@/lib/types";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: UserData | null; // Tambahkan prop data
}

import { ProfileFormValues } from "./ProfileForm";
import { api } from "@/lib/api";

export function ProfileDialog({ open, onOpenChange, data }: ProfileDialogProps) {
  // Fungsi ini akan dijalankan saat form disubmit
  const handleSubmit = async (values: ProfileFormValues) => {
    // Di dunia nyata, Anda akan memanggil API di sini
    const id = localStorage.getItem("userId");

    // jangan include password jika password kosong
    if (!values.password) {
      delete values.password;
    }
    console.debug("Updated profile:", values);

    const response = await api.put(`/api/user/${id}`, values);

    if (response.status !== 200) {
      alert("Failed to update profile");
      return;
    }

    alert("Profile updated successfully!");
    onOpenChange(false); // Otomatis tutup dialog setelah submit
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Ubah data profil Anda di sini. Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ProfileForm dataUser={data} onSubmit={handleSubmit} onClose={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}