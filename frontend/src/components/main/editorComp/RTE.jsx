import React from 'react'
import {Controller} from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'

const RTE = ({
    control,
    name,
    label,
    defaultvalue = '<h1>Hello write what every you want</h1>'
}) => {
  return (
    <div className='pb-10'>
        {
            label && <label>{label}</label>
        }
        <Controller
            name={name || 'content'}
            control={control}
            render={({ field: {onChange}}) => (
                <Editor
                    apiKey='jhk0myemcosvx3iny1rwltlhfnx03q58tab3au0oqphym3z4'
                    initialValue={defaultvalue}
                    init={{
                        height: 500,
                        menubar: true,
                        branding: false,
                        // content_css: "/src/index.css",
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                        "undo redo | blocks | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={onChange}
                />
            )}
        />
    </div>
  )
}

export default RTE