import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

function profile() {
  const { authUser, updatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  // Az elérési útvonal beállítása
  const defaultAvatarPath = `${process.env.PUBLIC_URL || ''}./avatarDefault.png`;

  return (
    <div className='h-screen pt-20'>
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className='text-2xl font-semibold'>Profil</h1>
          </div>

          {/* Profilkép feltöltés */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || defaultAvatarPath}
                alt="Profilkép"
                className='size-60 rounded-full object-cover border-4'
              />
              <label
                htmlFor="avatarUpload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-110 p-2 rounded-full cursor-pointer
              transition-all duration-200
              `}
              >
                <Camera className='size-5 text-base-200' />
                <input type="file" className='hidden' id='avatarUpload' accept='image/*' onChange={handleImage} />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>Kattints a fényképezőre a profilkép frissítéséhez</p>
          </div>

          {/* Profiladatok */}
          <div className="space-y-6">
            <div className="space-y-1 5">
              <div className="text-sm text-zinc-400 felx-center gap-2">
                <User className='size-5' /> Teljes név
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'> {authUser.name}</p>
            </div>

            <div className="space-y-1 5">
              <div className="text-sm text-zinc-400 felx-center gap-2">
                <Mail className='size-5' /> Email
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'> {authUser.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;