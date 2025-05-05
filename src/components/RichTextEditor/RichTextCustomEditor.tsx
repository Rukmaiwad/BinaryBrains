import { Suspense } from 'react';
import RichTextEditor from 'reactjs-tiptap-editor';
import { BaseKit } from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';
import { Bold } from 'reactjs-tiptap-editor/bold'; 
import { Italic } from 'reactjs-tiptap-editor/italic'; 
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline'; 
import { Emoji } from 'reactjs-tiptap-editor/emoji'; 
import { Strike } from 'reactjs-tiptap-editor/strike'; 
import { Blockquote } from 'reactjs-tiptap-editor/blockquote'; 
import { Color } from 'reactjs-tiptap-editor/color'; 
import { BulletList } from 'reactjs-tiptap-editor/bulletlist'; 
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist'; 
import { Code } from 'reactjs-tiptap-editor/code'; 
import { FontFamily } from 'reactjs-tiptap-editor/fontfamily'; 
import { FontSize } from 'reactjs-tiptap-editor/fontsize'; 
import { Heading } from 'reactjs-tiptap-editor/heading'; 
import { Highlight } from 'reactjs-tiptap-editor/highlight'; 
import { Image } from 'reactjs-tiptap-editor/image'; 
import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace'; 
import { Link } from 'reactjs-tiptap-editor/link'; 
import { SubAndSuperScript } from 'reactjs-tiptap-editor/subandsuperscript'; 
import { Table } from 'reactjs-tiptap-editor/table'; 
import { TaskList } from 'reactjs-tiptap-editor/tasklist'; 
import { TextAlign } from 'reactjs-tiptap-editor/textalign'; 
import { Video } from 'reactjs-tiptap-editor/video'; 
import { ExportPdf } from 'reactjs-tiptap-editor/exportpdf'; 
import { Mermaid } from 'reactjs-tiptap-editor/mermaid'; 

import 'react-image-crop/dist/ReactCrop.css'; 

const RichTextCustomEditor = ({ content, setContent }: { content: string, setContent: any }) => {

  const extensions = [
    BaseKit.configure({
      // Show placeholder
      placeholder: {  
        showOnlyCurrent: true, 
      },  
  
      // Character count
      characterCount: {  
        limit: 50_000,  
      },  
    }),
    Heading,
    Blockquote,
    Color,
    TextAlign,
    FontSize,
    FontFamily,
    Bold,
    Italic,
    TextUnderline,
    Emoji,
    Strike,
    Highlight,
    SearchAndReplace,
    BulletList,
    OrderedList,
    SubAndSuperScript,
    Table,
    TaskList,
    Image.configure({
      upload: (files: File) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(URL.createObjectURL(files))
          }, 500)
        })
      },
    }),
    Video.configure({
      upload: (files: File) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(URL.createObjectURL(files))
          }, 500)
        })
      },
    }), 
    Code,
    Link,
    ExportPdf,
    Mermaid
  ]

  const onChangeContent = (value: any) => {
    setContent(value);
  };

  return (
    <Suspense fallback={<div>Loading editor...</div>}>
    <div className='dark p-2'>
        <RichTextEditor
          output='html'
          content={content}
          onChangeContent={onChangeContent}
          extensions={extensions}
        /> 
    </div>
    </Suspense>
  )
}

export default RichTextCustomEditor