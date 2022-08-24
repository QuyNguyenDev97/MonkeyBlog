import useUpperFirstLetter from "../../hook/useUpperFirstLetter";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeading from "../dashboard/DashboardHeading";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-data/firebaseConfig";
import { categoryStatus } from "../../utils/constants";
import Button from "../../component/button/Button";
import Radio from "../../component/checkbox/Radio";
import Field from "../../component/field/Field";
import Input from "../../component/input/Input";
import Label from "../../component/label/Label";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";

const CategoryUpdate = () => {
  const {
    control,
    formState: { isSubmitting },
    reset,
    watch,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });
  const { handleValues } = useUpperFirstLetter();
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const watchStatus = watch("status");
  const navigate = useNavigate();
  const handleUpdateCategory = async (values) => {
    const { name, status, slug } = values;
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: handleValues(name),
      status: Number(status),
      slug: slugify(slug || name, { lower: true }),
    });
    toast.success("Update category successfully");
    navigate("/manage/category");
  };
  useEffect(() => {
    async function updateCategory() {
      const colRef = doc(db, "categories", categoryId);
      const currentDoc = await getDoc(colRef);
      reset(currentDoc.data());
    }
    updateCategory();
  }, [categoryId, reset]);
  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
          className="mx-auto"
          type="submit"
        >
          Update your category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
