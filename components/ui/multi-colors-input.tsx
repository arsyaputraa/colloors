"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { PlusIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MultiColorsInput = ({
  colorString,
  errors,
  name,
  returnType = "string",
}: {
  colorString: string;
  errors: any;
  name: string;
  returnType?: "string" | "array";
}) => {
  const colorArray = useMemo(() => {
    if (colorString === "") return [];
    const colorStringArray = colorString.split("-");
    if (colorStringArray.length === 0) {
      return [];
    }
    return colorStringArray.map((item, idx) => item.toLowerCase());
  }, [colorString]);

  const [colors, setColors] = useState<string[]>(colorArray || []);

  const [stringColorValue, setStringColorValue] = useState<string>(colorString);

  const stringValue = useCallback(() => {
    const colorString = colors.join("-");
    if (colorString[colorString.length - 1] === "-") {
      return colorString.slice(0, -1);
    }
    return colorString;
  }, [colors]);

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const addColor = () => {
    setColors([...colors, "#000000"]);
  };

  const removeColor = (index: number) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  useEffect(() => {
    setStringColorValue(stringValue());
  }, [colors]);
  return (
    <>
      {returnType === "string" && (
        <input
          type="text"
          name={name}
          value={stringColorValue}
          onChange={(e) => setStringColorValue(e.target.value)}
          className="hidden"
        />
      )}

      <div className="grid grid-cols-12 gap-1">
        <Label className="col-span-12 mb-2">Colors</Label>
        <div className="flex flex-wrap col-span-10 gap-2">
          {colors.map((color, index) => (
            <div key={index} className="flex gap-1 relative">
              <Input
                type="color"
                name={`color-${index}`}
                defaultValue={"#000000"}
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className={cn(
                  "w-10 p-1",
                  errors?.colors ? "ring ring-destructive" : ""
                )}
              />
              <Button
                type="button"
                variant="secondary"
                className="rounded-full p-1 w-5 h-5 absolute -top-2 -right-2 "
                onClick={() => removeColor(index)}
              >
                <XIcon className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="col-span-2 w-min place-self-end"
          onClick={addColor}
        >
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
};

export default MultiColorsInput;
