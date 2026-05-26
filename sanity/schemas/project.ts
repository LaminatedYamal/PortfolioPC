export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { 
      name: 'title', 
      title: 'Title', 
      type: 'string', 
      validation: (Rule: any) => Rule.required() 
    },
    { 
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      options: { source: 'title' } 
    },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string', 
      options: {
        list: [
          { title: 'Strategy', value: 'strategy' },
          { title: 'Web3', value: 'web3' },
          { title: 'SEO & SEM', value: 'seo-sem' },
          { title: 'Content Marketing', value: 'content-marketing' },
          { title: 'Social Media', value: 'social-media' },
          { title: 'Academic / 3D', value: 'academic-3d' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    { 
      name: 'featured', 
      title: 'Featured on Homepage', 
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'thumbnail',
      title: 'Card Thumbnail (Cover Image)',
      type: 'image',
      description: 'The cover image displayed on the project card grid. If not set, it will fall back to a default visual.',
      options: {
        hotspot: true
      }
    },
    { 
      name: 'overview', 
      title: 'Project Overview', 
      type: 'text' 
    },
    { 
      name: 'skillsAcquired', 
      title: 'Skills Acquired', 
      type: 'array', 
      of: [{ type: 'string' }] 
    },
    { 
      name: 'description', 
      title: 'Detailed Description', 
      type: 'array', 
      of: [{ type: 'block' }] 
    },
    {
      name: 'toolStack',
      title: 'Tool Stack',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Icons matching FontAwesome, e.g., "unity", "google-apps-script", "zoho", "meta"'
    },
    {
      name: 'mediaGallery',
      title: 'Media Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'mediaItem',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'PDF', value: 'pdf' },
                  { title: 'Video Embed (YouTube/Vimeo)', value: 'video' },
                  { title: '3D Spatial Environment (Iframe/WebGL)', value: 'spatial' }
                ]
              }
            },
            { 
              name: 'imageFile', 
              title: 'Image File', 
              type: 'image', 
              hidden: ({ parent }: any) => parent?.type !== 'image' 
            },
            { 
              name: 'pdfFile', 
              title: 'PDF File', 
              type: 'file', 
              hidden: ({ parent }: any) => parent?.type !== 'pdf' 
            },
            { 
              name: 'embedUrl', 
              title: 'Embed URL', 
              type: 'url', 
              hidden: ({ parent }: any) => parent?.type === 'image' || parent?.type === 'pdf' 
            }
          ]
        }
      ]
    }
  ]
}
