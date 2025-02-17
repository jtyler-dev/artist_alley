"use client";
import React, { useRef, useActionState, useState } from "react";
import {
  DndContext,
  closestCenter,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormBuilderSchema,
  type FormBuilderSchemaType,
  type FormFieldSchemaType,
} from "./FormBuilderSchema";
import { FormBuilderAction } from "./actions";
import { useSetFormFieldErrors } from "@/hooks/useSetFormFieldErrors";
import { v4 as uuidv4 } from "uuid";
import { FormFieldType } from "@prisma/client";
import z from "zod";
import { SortableFormItem } from "./SortableFormItem";
import { UpdateFieldType } from "./types";
import { Button } from "@/components/ui/button";

export interface FormBuilderProps {
  defaultValues?: FormBuilderSchemaType;
  isEditing?: boolean;
}

export const FormBuilder = ({
  defaultValues,
  isEditing = false,
}: FormBuilderProps) => {
  const [activeFormField, setActiveFormField] = useState<FormFieldSchemaType>();
  const [activeSection, setActiveSection] = useState(uuidv4());
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction, isPending] = useActionState(FormBuilderAction, {
    message: undefined,
    fieldErrors: undefined,
  });

  // set up additional sensors for the dnd context
  // this will allow the user interact with elements better
  const senors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20, // 100px
      },
    })
  );

  const form = useForm<FormBuilderSchemaType>({
    resolver: zodResolver(FormBuilderSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      sections: [
        {
          id: activeSection,
          title: "",
          fields: [],
        },
      ],
      ...(formState?.fields ?? {}),
    },
  });

  useSetFormFieldErrors({
    formState,
    formClearErrors: form.clearErrors,
    formSetError: form.setError,
  });

  // Add a new field to the form
  const sections = form.watch("sections");

  const handleAddSection = () => {
    const newSectionId = uuidv4();
    form.setValue("sections", [
      ...sections,
      {
        id: newSectionId,
        title: "",
        fields: [],
      },
    ]);
    setActiveSection(newSectionId);
  };

  const handleAddField = (type: FormFieldType) => {
    form.setValue(
      "sections",
      sections.map((section) =>
        section.id === activeSection
          ? {
              ...section,
              fields: [
                ...section.fields,
                {
                  id: uuidv4(),
                  question: "",
                  type,
                  options: [],
                  isRequired: false,
                },
              ],
            }
          : section
      )
    );
  };

  const handleCopyField = (field: FormFieldSchemaType) => {
    form.setValue(
      "sections",
      sections.map((section) =>
        section.id === activeSection
          ? {
              ...section,
              fields: [
                ...section.fields,
                {
                  ...field,
                  id: uuidv4(),
                },
              ],
            }
          : section
      )
    );
  };

  const handleFieldUpdate = (
    fieldId: string,
    fieldUpdates: UpdateFieldType
  ) => {
    form.setValue(
      "sections",
      sections.map((section) =>
        section.id === activeSection
          ? {
              ...section,
              fields: section.fields.map((f) =>
                f.id === fieldId ? { ...f, ...fieldUpdates } : f
              ),
            }
          : section
      )
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const field = sections
      .map((section) => section.fields)
      .flat()
      .find((f) => f.id === active.id);

    if (field) {
      setActiveFormField(field);
    }
  };

  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const newSections = [...sections];
    const activeField = newSections
      .map((section) => section.fields)
      .flat()
      .find((f) => f.id === active.id);

    if (!activeField) return;

    const fromSectionIndex = newSections.findIndex((section) =>
      section.fields.some((f) => f.id === active.id)
    );

    const toSectionIndex = newSections.findIndex((section) =>
      section.fields.some((f) => f.id === over.id)
    );

    if (fromSectionIndex === -1 || toSectionIndex === -1) return;

    const fromFieldIndex = newSections[fromSectionIndex].fields.findIndex(
      (f) => f.id === active.id
    );

    if (fromFieldIndex === -1) return;

    const fieldToMove = newSections[fromSectionIndex].fields[fromFieldIndex];
    newSections[fromSectionIndex].fields.splice(fromFieldIndex, 1);
    newSections[toSectionIndex].fields.push(fieldToMove);

    form.setValue("sections", newSections);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    let fromSectionIndex = -1;
    let toSectionIndex = -1;
    let fromFieldIndex = -1;

    sections.forEach((section, secIndex) => {
      const fieldIndex = section.fields.findIndex((f) => f.id === active.id);
      if (fieldIndex !== -1) {
        fromSectionIndex = secIndex;
        fromFieldIndex = fieldIndex;
      }
      if (section.fields.some((f) => f.id === over.id)) {
        toSectionIndex = secIndex;
      }
    });

    if (
      fromSectionIndex === -1 ||
      fromFieldIndex === -1 ||
      toSectionIndex === -1
    )
      return;

    const fieldToMove = sections[fromSectionIndex].fields[fromFieldIndex];
    const newSections = [...sections];
    newSections[fromSectionIndex].fields.splice(fromFieldIndex, 1);
    newSections[toSectionIndex].fields.push(fieldToMove);
    form.setValue("sections", newSections);

    setActiveFormField(undefined);
  };

  return (
    <Form {...form}>
      <form ref={formRef} action={formAction}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DndContext
          sensors={senors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {sections.map((section) => {
            return (
              <div
                key={section.id}
                className="rounded-md border-solid border border-gray-200"
                onClick={() => {
                  if (activeSection !== section.id) {
                    setActiveSection(section.id);
                  }
                }}
              >
                <Button
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                >
                  Edit
                </Button>
                {section.id === activeSection && (
                  <>
                    <Button type="button" onClick={handleAddSection}>
                      Add Section
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleAddField("TEXT")}
                    >
                      Add Text Field
                    </Button>
                  </>
                )}
                <SortableContext items={section.fields.map((f) => f.id)}>
                  {section.fields.map((field) => {
                    return (
                      <SortableFormItem
                        key={field.id}
                        field={field}
                        onChange={handleFieldUpdate}
                        onCopy={handleCopyField}
                      />
                    );
                  })}
                </SortableContext>
              </div>
            );
          })}

          <DragOverlay>
            {activeFormField && (
              <SortableFormItem
                key={activeFormField.id}
                field={activeFormField}
              />
            )}
          </DragOverlay>
        </DndContext>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

// "use client";
// import React, { useRef, useActionState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   DragEndEvent,
//   useSensor,
//   useSensors,
//   PointerSensor,
// } from "@dnd-kit/core";
// import { SortableContext, arrayMove } from "@dnd-kit/sortable";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import {
//   FormBuilderSchema,
//   type FormBuilderSchemaType,
//   type FormFieldSchemaType,
// } from "./FormBuilderSchema";
// import { FormBuilderAction } from "./actions";
// import { useSetFormFieldErrors } from "@/hooks/useSetFormFieldErrors";
// import { v4 as uuidv4 } from "uuid";
// import { FormFieldType } from "@prisma/client";
// import z from "zod";
// import { SortableFormItem } from "./SortableFormItem";
// import { UpdateFieldType } from "./types";

// export interface FormBuilderProps {
//   defaultValues?: FormBuilderSchemaType;
//   isEditing?: boolean;
// }

// export const FormBuilder = ({
//   defaultValues,
//   isEditing = false,
// }: FormBuilderProps) => {
//   const formRef = useRef<HTMLFormElement>(null);
//   const [formState, formAction, isPending] = useActionState(FormBuilderAction, {
//     message: undefined,
//     fieldErrors: undefined,
//   });

//   // set up additional sensors for the dnd context
//   // this will allow the user interact with elements better
//   const senors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 20, // 100px
//       },
//     })
//   );

//   const form = useForm<FormBuilderSchemaType>({
//     resolver: zodResolver(FormBuilderSchema),
//     defaultValues: defaultValues ?? {
//       title: "",
//       description: "",
//       sections: [
//         {
//           id: uuidv4(),
//           title: "",
//           fields: [],
//         },
//       ],
//       ...(formState?.fields ?? {}),
//     },
//   });

//   useSetFormFieldErrors({
//     formState,
//     formClearErrors: form.clearErrors,
//     formSetError: form.setError,
//   });

//   // Add a new field to the form

//   const fields = form.watch("fields");
//   const addField = (type: FormFieldType) => {
//     form.setValue("fields", [
//       ...fields,
//       {
//         id: uuidv4(),
//         question: "",
//         type,
//         options: [],
//         isRequired: false,
//       },
//     ]);
//   };

//   const onCopyField = (field: FormFieldSchemaType) => {
//     form.setValue("fields", [
//       ...fields,
//       {
//         ...field,
//         id: uuidv4(),
//       },
//     ]);
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     const oldIndex: number = fields.findIndex(
//       (f: FormFieldSchemaType) => f.id === active.id
//     );

//     const newIndex: number = fields.findIndex(
//       (f: FormFieldSchemaType) => f.id === over?.id
//     );

//     const newFields = arrayMove(fields, oldIndex, newIndex);
//     form.setValue("fields", newFields);
//   };

//   const onFieldUpdate = (fieldId: string, fieldUpdates: UpdateFieldType) => {
//     form.setValue(
//       "fields",
//       fields.map((f) => (f.id === fieldId ? { ...f, ...fieldUpdates } : f))
//     );
//   };

//   return (
//     <Form {...form}>
//       <form ref={formRef} action={formAction}>
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Title</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <button type="button" onClick={() => addField("TEXT")}>
//           Add Text Field
//         </button>
//         <DndContext
//           sensors={senors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext items={fields.map((f) => f.id)}>
//             {fields.map((field) => {
//               return (
//                 <SortableFormItem
//                   key={field.id}
//                   field={field}
//                   onChange={onFieldUpdate}
//                   onCopy={onCopyField}
//                 />
//               );
//             })}
//           </SortableContext>
//         </DndContext>
//         <button type="submit">Submit</button>
//       </form>
//     </Form>
//   );
// };
