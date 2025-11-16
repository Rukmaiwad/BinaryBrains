import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface EditorProps {
  onEditorChange: (e: any) => void;
  value: string;
  height?: number
}

export default function CustomTextEditor({ onEditorChange, value, height = 400 }: EditorProps) {
  const editorRef: any = useRef(null);

  return (
    <>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        key={"tiny-mce-editor"}
        licenseKey="gpl"
        scriptLoading={{ async: false }}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="Write your content here ..."
        value={value}
        onEditorChange={onEditorChange}
        init={{
          height,
          promotion: false,
          mobile: {
            theme: "silver",
            menubar: true,
            toolbar:
              "undo redo | blocks | bold italic underline forecolor backcolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link image media table | " +
              "removeformat | fullscreen preview code",
            plugins: [
              "advlist", "anchor", "autolink", "charmap", "code", "fullscreen",
              "help", "image", "insertdatetime", "link", "lists", "media",
              "preview", "searchreplace", "table", "visualblocks", "wordcount"
            ],
          },

          menubar: "file edit view insert format tools table help",

          plugins: [
            "advlist", "anchor", "autolink", "charmap", "code", "fullscreen",
            "help", "image", "insertdatetime", "link", "lists", "media",
            "preview", "searchreplace", "table", "visualblocks", "wordcount"
          ],

          toolbar:
            "undo redo | blocks | bold italic underline forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image media table | " +
            "removeformat | fullscreen preview code",

          menu: {
            file: { title: "File", items: "newdocument restoredraft | preview | print" },
            edit: { title: "Edit", items: "undo redo | cut copy paste | selectall | searchreplace" },
            view: { title: "View", items: "code | visualaid visualblocks | preview fullscreen" },
            insert: {
              title: "Insert",
              items: "image link media | inserttable | charmap hr | insertdatetime"
            },
            format: {
              title: "Format",
              items:
                "bold italic underline strikethrough | forecolor backcolor | " +
                "blocks fontfamily fontsize | align | removeformat"
            },
            tools: { title: "Tools", items: "wordcount" },
            table: { title: "Table", items: "inserttable | cell row column | tableprops deletetable" },
            help: { title: "Help", items: "help" },
          },

          paste_data_images: true,
          images_upload_handler: async (blobInfo) => {
            try {
              const formData = new FormData();
              formData.append("file", blobInfo.blob(), blobInfo.filename());
              //  need to write the logic to upload image
              return "";
            } catch (err: any) {
              console.log(err)
              return ""
            }
        },

          content_style: `
            body {
              font-family: Helvetica, Arial, sans-serif;
              font-size: 15px;
              line-height: 1.6;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          `,
        }}
      />
    </>
  );
}