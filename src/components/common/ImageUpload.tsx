import React, { Fragment } from "react";
import { Button } from "../ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import { Label } from "../ui/label";
import { useDeleteImage, useUploadImage } from "../../services/image";
import toast from "react-hot-toast";
import { Icons } from "../../utils/icons";

const ImageUpload: React.FC<{
  image: string;
  field: any;

  setImage: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRemove: (e: React.SyntheticEvent) => void;
  loading: boolean;
}> = ({ image, field, setImage, type, onChange, loading, onRemove }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }
  console.log(image, "image");

  return (
    <Fragment>
      {image?.length != 0 ? (
        <div className="relative rounded-md">
          <Image
            src={image}
            alt=""
            width={500}
            height={500}
            objectFit="contain"
            className="rounded-md"
          />
          <Button
            // onClick={}
            className="ml-auto absolute top-1 right-1"
            variant={"destructive"}
            size={"icon"}
            onClick={onRemove}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div>
          <Input
            {...field}
            value=""
            placeholder="Category name"
            id="file-upload"
            type="file"
            className="hidden cursor-pointer"
            accept="image/*"
            onChange={onChange}
          />
          <Label
            htmlFor="file-upload"
            className="cursor-pointer border rounded-xl p-2 font-medium outline-neutral-100 flex items-center gap-2 "
          >
            <ImagePlus className="h-6 w-6" />
            Upload a billboard
          </Label>
        </div>
      )}
    </Fragment>
  );
};

export default ImageUpload;
