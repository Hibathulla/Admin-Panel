import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import React, { Fragment } from "react";
import { Icons } from "../../utils/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const MultiImagesUpload: React.FC<{
  images: string[];
  field: any;

  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  type: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRemove: (e: React.SyntheticEvent, index: number) => void;
  loading: boolean;
}> = ({ images, field, setImages, type, onChange, loading, onRemove }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <Fragment>
      {images?.length != 0 ? (
        <div className="flex items-center gap-4">
          {images?.map((image, index) => {
            console.log(image, "image");

            return (
              <div key={index} className="relative aspect-square rounded-md">
                <Image
                  src={image}
                  alt=""
                  width={250}
                  height={250}
                  objectFit="contain"
                  className="rounded-md"
                />
                <Button
                  // onClick={}
                  className="ml-auto absolute top-1 right-1"
                  variant={"destructive"}
                  size={"icon"}
                  onClick={(e: React.SyntheticEvent) => onRemove(e, index)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <Input
            {...field}
            value={""}
            placeholder="Product name"
            multiple
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
            Upload product images
          </Label>
        </div>
      )}
    </Fragment>
  );
};

export default MultiImagesUpload;
