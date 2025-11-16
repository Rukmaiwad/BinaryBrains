import CustomTextEditor from "@/components/RichTextEditor/CustomTextEditor"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { isInvalid } from "@/utils/utils"
import { useState } from "react"

const CreateArticle = () => {

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('');

    return (
        <div className='flex flex-col border w-full items-center dark'>
            <h1 className="text-3xl my-3">{!isInvalid(title) ? title : 'Create Article'}</h1>
            <Input 
                id="article_title" 
                placeholder="Enter title of article." 
                className="w-11/12 my-4" 
                style={{ height: '50px'}}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <Textarea placeholder="Enter description of article." className="w-11/12" style={{ height: '200px'}}/>
            <div className="w-11/12 my-3 h-1/2 rounded-xl overflow-auto">
                <CustomTextEditor
                    onEditorChange={(e) => setContent(e)}
                    value={content}
                />
            </div>
        </div>
    )
}

export default CreateArticle