import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../../component/button/Button";
import Radio from "../../component/checkbox/Radio";
import Field from "../../component/field/Field";
import Input from "../../component/input/Input";
import Label from "../../component/label/Label";
import { useForm } from "react-hook-form";
import React from "react";
import slugify from "slugify";
import { categoryStatus } from "../../utils/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-data/firebaseConfig";
import { toast } from "react-toastify";
import useUpperFirstLetter from "../../hook/useUpperFirstLetter";

const CategoryAddNew = () => {
  const { handleValues } = useUpperFirstLetter();
  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const handleAddCategory = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.name = handleValues(cloneValues.name);
    cloneValues.slug = slugify(cloneValues.name || values.slug, {
      lower: true,
    });
    cloneValues.status = Number(cloneValues.status);
    console.log("handleAddCategory ~ cloneValues", cloneValues);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...cloneValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Created category successfully");
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
      });
    }
  };
  const watchStatus = watch("status");
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form autoComplete="off" onSubmit={handleSubmit(handleAddCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
          className="mx-auto"
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
