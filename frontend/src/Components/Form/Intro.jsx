import React from 'react'

export default function Intro() {
  return (
    <div className='intro'>
        <div>
            <Form method="post">
            <input type='text' name='username' required placeholder='Enter your name..'aria-label='your name..'></input>

            </Form>
        </div>
      
    </div>
  )
}
