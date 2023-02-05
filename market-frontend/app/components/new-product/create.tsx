import type { EventTargetExtended } from "~/types/data";

import { useEffect, useRef, useState } from "react";
import { useSubmit, useTransition } from "@remix-run/react";
import { v4 as uuid } from "uuid";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

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
      <div className="flex flex-wrap items-center gap-2">
        {imagesPreview.length > 0 &&
          imagesPreview.map((img) => (
            <div key={img.id} className="relative">
              <img className="h-40 w-40" alt={img.alt} src={img.src} />
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
