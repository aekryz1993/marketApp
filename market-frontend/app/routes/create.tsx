import type { ActionFunction } from "@remix-run/node";
import type { EventTargetExtended } from "~/types/data";

import { useEffect, useRef, useState } from "react";
import {
  useSubmit,
  useTransition,
} from "@remix-run/react";
import {
  json,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { v4 as uuid } from "uuid";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { uploadImageToCloudinary } from "~/utils/upload-file-cloudinary.server";

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, data, filename }) => {
      try {
        if (name !== "images") {
          return undefined;
        }

        const uploadedImage = await uploadImageToCloudinary(data, {
          height: 261,
          width: 261,
          crop: "scale",
        });
        return JSON.stringify({
          alt: filename,
          original: uploadedImage?.secure_url,
          square: uploadedImage?.eager[0].secure_url,
        });
      } catch (error: any) {
        console.error(error.message);
      }
    },

    unstable_createMemoryUploadHandler()
  );
  try {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );
    const images = formData.getAll("images");
    const formattedImages = images.map((image) => JSON.parse(image as string));
    return json({ data: formattedImages });
  } catch (error) {
    console.log(error);
  }
};

export default function CreateProduct() {

  const [imagesPreview, setImagesPreview] = useState<
    { id: string; src: string; alt: string; file: File }[]
  >([]);

  const submit = useSubmit();
  const transition = useTransition();

  const submittedRef = useRef(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as EventTargetExtended;
    const files = target.files;

    for (let file of files) {
      setImagesPreview((prevState) => [
        ...prevState,
        {
          id: uuid(),
          src: URL.createObjectURL(file),
          alt: file.name,
          file,
        },
      ]);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    for (let imagePreview of imagesPreview) {
      formData.append(`images`, imagePreview.file);
    }
    submit(formData, { method: "post", encType: "multipart/form-data" });
    submittedRef.current = true;
  };

  const handleDeletePreviewImage = (id: string) => {
    setImagesPreview((prevState) =>
      prevState.filter((previewImage) => previewImage.id !== id)
    );
  };

  useEffect(() => {
    if (transition.state === "idle" && submittedRef.current) {
      setImagesPreview([]);
      submittedRef.current = false;
    }
  }, [transition.state]);

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        {imagesPreview.length > 0 &&
          imagesPreview.map((img) => (
            <div key={img.id} className="relative">
              <input
                className="h-40 w-40"
                type="image"
                alt={img.alt}
                src={img.src}
              />
              <XMarkIcon
                className="absolute top-2 right-2 h-8 w-8 cursor-pointer rounded-full bg-zinc-500 p-1 text-slate-50 focus:bg-slate-900"
                onClick={() => {
                  handleDeletePreviewImage(img.id);
                }}
              />
            </div>
          ))}
        <input
          className="absolute z-0 opacity-0"
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          multiple
          required
        />
        <label
          className="flex h-40 w-40 cursor-pointer items-center justify-center"
          htmlFor="file-upload"
        >
          <PlusCircleIcon className="h-40 w-40 cursor-pointer" />
        </label>
      </div>
      <br />
      <button
        onClick={handleSubmit}
        disabled={transition.submission ? true : false}
      >
        {transition.submission ? "..." : "Submit"}
      </button>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </div>
  );
}
