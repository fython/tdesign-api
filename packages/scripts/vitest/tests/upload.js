module.exports = {
  Upload: {
    abridgeName: {
      PC: {
        props: { abridgeName: [8, 6] },
        dom: [
          {
            description: 'props.abridgeName works fine if theme=file-input',
            props: { theme: 'file-input', files: [{ name: 'this_is_a_long_name.png' }] },
            dom: [{ '.t-upload__single-input-text': { text: 'this_is_…me.png' } }],
          },
          {
            description: 'props.abridgeName works fine if theme=file and file url exists',
            props: {
              theme: 'file',
              files: [{ name: 'this_is_a_long_name.png', url: 'https://xxx.png' }],
            },
            dom: [{ '.t-upload__single-name': { text: 'this_is_…me.png' } }],
          },
          {
            description: 'props.abridgeName works fine if theme=file and file url does not exist',
            props: { theme: 'file', files: [{ name: 'this_is_a_long_name.png' }] },
            dom: [{ '.t-upload__single-name': { text: 'this_is_…me.png' } }],
          },
          {
            description: 'props.abridgeName works fine if theme=image',
            props: { theme: 'image', files: [{ name: 'this_is_a_long_name.png' }] },
            dom: [{ '.t-upload__card-name': { text: 'this_is_…me.png' } }],
          },
          {
            description: 'props.abridgeName works fine if theme=file&draggable=true',
            props: { theme: 'file', draggable: true, files: [{ name: 'this_is_a_long_name.png' }] },
            dom: [{ '.t-upload__single-name': { text: 'this_is_…me.png' } }],
          },
          {
            description: 'props.abridgeName works fine if theme=image&draggable=true',
            props: {
              theme: 'image',
              draggable: true,
              status: 'success',
              files: [{ name: 'this_is_a_long_name.png', url: 'https://wwww.png' }],
            },
            dom: [{ '.t-upload__single-name': { text: 'this_is_…me.png' } }],
          },
          {
            description: 'props.abridgeName works fine if theme=image-flow',
            props: {
              theme: 'image-flow',
              files: [{ name: 'this_is_a_long_name.jpg', url: 'https://xxx.jpg' }],
            },
            dom: [{ '.t-upload__card-name': { text: 'this_is_…me.jpg' } }],
          },
          {
            description: 'props.abridgeName works fine if theme=file-flow and file url exists',
            props: {
              theme: 'file-flow',
              files: [{ name: 'this_is_a_long_name.jpg', url: 'https://xxx.jpg' }],
            },
            dom: [{ '.t-upload__file-name > a': { text: 'this_is_…me.jpg' } }],
          },
          {
            description:
              'props.abridgeName works fine if theme=file-flow and file url does not exist',
            props: { theme: 'file-flow', files: [{ name: 'this_is_a_long_name.jpg' }] },
            dom: [{ '.t-upload__file-name': { text: 'this_is_…me.jpg' } }],
          },
        ],
      },
      id: 2995,
    },
    accept: { PC: { attribute: { accept: 'image/*' }, attributeDom: 'input' }, id: 872 },
    action: {
      PC: {
        global: {
          imports: ["import { getUploadServer } from './request'"],
          variables: ['const server = getUploadServer()'],
          beforeAll: ["server.listen({ onUnhandledRequest: 'error' })"],
          afterEach: ['server.resetHandlers()'],
          afterAll: ['server.close()'],
        },
        event: [
          {
            props: { action: 'https://tdesign.test.com/upload/image_success' },
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  selectChange: [
                    '${fileList}',
                    {
                      currentSelectedFiles: [
                        {
                          lastModified: 1674355700444,
                          name: 'file-name.txt',
                          percent: 0,
                          raw: '${fileList[0]}',
                          size: 22,
                          type: 'image/png',
                          status: 'undefined',
                        },
                      ],
                    },
                  ],
                  change: [
                    {
                      '[0].lastModified': 1674355700444,
                      '[0].response': 'toBeTruthy',
                      '[0].name': 'file-name.txt',
                      '[0].percent': 100,
                      '[0].status': 'success',
                      '[0].raw': '${fileList[0]}',
                      '[0].uploadTime': 'toBeTruthy',
                    },
                    {
                      trigger: 'add',
                      'file.raw': '${fileList[0]}',
                      'file.url': 'https://tdesign.gtimg.com/demo/demo-image-1.png',
                      'file.name': 'file-name.txt',
                      'file.uploadTime': 'toBeTruthy',
                      'file.response': 'toBeTruthy',
                    },
                  ],
                },
                delay: true,
              },
            ],
          },
        ],
      },
      id: 873,
    },
    allowUploadDuplicateFile: {
      PC: {
        event: [
          {
            props: {
              files: [
                {
                  name: 'file-name.txt',
                  url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
                },
              ],
              action: 'https://tdesign.test.com/upload/file_success',
              allowUploadDuplicateFile: false,
            },
            description: 'allowUploadDuplicateFile is equal to false',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  validate: [{ type: 'FILTER_FILE_SAME_NAME', 'files[0].raw': '${fileList[0]}' }],
                },
                delay: true,
              },
            ],
          },
          {
            props: {
              files: [
                {
                  name: 'file-name.txt',
                  url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
                },
              ],
              action: 'https://tdesign.test.com/upload/file_success',
              allowUploadDuplicateFile: true,
            },
            description: 'allowUploadDuplicateFile is equal to true',
            expect: [
              { trigger: "simulateFileChange('input')", event: { validate: 'not' }, delay: true },
            ],
          },
        ],
      },
      id: 2454,
    },
    autoUpload: {
      PC: {
        event: [
          {
            props: { autoUpload: false, action: 'https://tdesign.test.com/upload/file_success' },
            description: 'autoUpload is equal false',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  change: [
                    {
                      '[0].response': 'undefined',
                      '[0].raw': '${fileList[0]}',
                      '[0].name': 'file-name.txt',
                      '[0].status': 'waiting',
                      '[0].percent': 0,
                    },
                  ],
                },
                delay: true,
              },
            ],
          },
          {
            description: 'autoUpload=false & theme=file-flow, cancel upload works fine',
            props: {
              theme: 'file-flow',
              autoUpload: false,
              files: [
                {
                  name: 'file1.txt',
                  status: 'waiting',
                  uploadTime: '2023-01-27',
                  lastModified: 1674830942522,
                },
                {
                  name: 'file2.txt',
                  status: 'success',
                  uploadTime: '2023-01-27',
                  lastModified: 1674831204354,
                },
                {
                  name: 'file3.txt',
                  status: 'fail',
                  uploadTime: '2023-01-27',
                  lastModified: 1674831204354,
                },
              ],
              action: 'https://tdesign.test.com/upload/file_success',
            },
            expect: [
              { trigger: 'click(.t-upload__continue)' },
              {
                trigger: 'click(.t-upload__cancel)',
                event: {
                  change: [
                    [
                      {
                        name: 'file1.txt',
                        status: 'waiting',
                        uploadTime: '2023-01-27',
                        lastModified: 1674830942522,
                      },
                      {
                        name: 'file2.txt',
                        status: 'success',
                        uploadTime: '2023-01-27',
                        lastModified: 1674831204354,
                      },
                      {
                        name: 'file3.txt',
                        status: 'waiting',
                        uploadTime: '2023-01-27',
                        lastModified: 1674831204354,
                      },
                    ],
                    { trigger: 'abort' },
                  ],
                  remove: 'not',
                },
              },
            ],
          },
        ],
      },
      id: 885,
    },
    beforeAllFilesUpload: {
      PC: {
        event: [
          {
            props: {
              autoUpload: false,
              beforeAllFilesUpload: '() => false',
              action: 'https://tdesign.test.com/upload/file_success',
            },
            description: 'beforeAllFilesUpload can stop uploading',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input', 'file', 3)",
                event: {
                  change: 'not',
                  validate: [
                    { type: 'BEFORE_ALL_FILES_UPLOAD', 'files.map(t => t.raw)': '${fileList}' },
                  ],
                },
                delay: true,
              },
            ],
          },
        ],
      },
      id: 2928,
    },
    beforeUpload: {
      PC: {
        event: [
          {
            props: {
              autoUpload: false,
              beforeUpload: '() => false',
              action: 'https://tdesign.test.com/upload/file_success',
            },
            description:
              'beforeUpload can skip all files to upload, just like beforeAllFilesUpload',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input', 'file', 3)",
                event: {
                  change: 'not',
                  validate: [
                    { type: 'CUSTOM_BEFORE_UPLOAD', 'files.map(t => t.raw)': '${fileList}' },
                  ],
                },
                delay: true,
              },
            ],
          },
          {
            props: {
              autoUpload: false,
              beforeUpload: "(file) => file.name === 'file-name1.txt'",
              action: 'https://tdesign.test.com/upload/file_success',
            },
            description: 'beforeUpload can skip some of files to upload',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input', 'file', 3)",
                event: {
                  change: [{ '[0].raw': '${fileList[1]}' }],
                  validate: [
                    {
                      type: 'CUSTOM_BEFORE_UPLOAD',
                      'files.map(t => t.raw)': '${[fileList[0], fileList[2]]}',
                    },
                  ],
                },
                delay: true,
              },
            ],
          },
        ],
      },
      id: 876,
    },
    children: {
      PC: {
        tnode: [
          {
            description: 'children works fine if theme = file',
            props: { theme: 'file', action: 'https://tdesign.test.com/upload/file_success' },
            snapshot: true,
          },
          {
            description: 'children works fine if theme = custom',
            props: { theme: 'custom', action: 'https://tdesign.test.com/upload/file_success' },
            snapshot: true,
          },
          {
            description: 'children works fine if theme = custom & draggable=true',
            props: {
              theme: 'custom',
              draggable: true,
              action: 'https://tdesign.test.com/upload/file_success',
            },
            params: [{ dragActive: false, files: [] }],
            snapshot: true,
          },
        ],
      },
      id: 1169,
    },
    data: {
      PC: {
        event: [
          {
            props: {
              data: { file_name: 'custom-file-name.excel' },
              action: 'https://tdesign.test.com/upload/fail/status_error',
            },
            description: 'upload request can send extra data',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  fail: [
                    {
                      'XMLHttpRequest.upload.requestParams': {
                        file_name: 'custom-file-name.excel',
                        file: '${fileList[0]}',
                        length: 1,
                      },
                    },
                  ],
                },
                delay: 700,
              },
            ],
          },
        ],
      },
      id: 877,
    },
    disabled: {
      PC: {
        dom: [
          {
            props: { theme: 'file-input', disabled: true },
            dom: ['.t-input.t-is-disabled', '.t-upload__trigger .t-button.t-is-disabled'],
          },
          {
            props: {
              theme: 'file-flow',
              disabled: true,
              multiple: true,
              files: [{ name: 'file1.txt', status: 'success' }],
            },
            dom: [{ '.t-upload__delete': false }],
          },
          {
            props: {
              theme: 'image-flow',
              disabled: true,
              multiple: true,
              files: [{ name: 'file1.txt', status: 'success' }],
            },
            dom: [{ '.t-upload__delete': false }],
          },
        ],
        event: [
          {
            description: 'disabled upload can not trigger onSelectChange',
            props: { disabled: true },
            expect: [{ trigger: "simulateFileChange('input')", event: { selectChange: 'not' } }],
          },
          {
            description: 'disabled upload can not remove file',
            props: { theme: 'file', files: [{ name: 'file1.txt' }] },
            expect: [{ exist: [{ '.t-upload__icon-delete': false }] }],
          },
          {
            description: 'disabled upload can not remove image',
            props: { theme: 'image', files: [{ name: 'img1.txt', url: 'https://img1.png' }] },
            expect: [{ exist: [{ '.t-upload__icon-delete': false }] }],
          },
        ],
      },
      id: 879,
    },
    dragContent: {
      PC: {
        props: {
          theme: 'custom',
          draggable: 'true',
          action: 'https://tdesign.test.com/upload/file_success',
        },
        tnode: true,
      },
      id: 2991,
    },
    draggable: {
      PC: {
        dom: [
          {
            description: 'theme=image & draggable=true, success file render fine',
            props: {
              theme: 'image',
              draggable: true,
              files: [
                {
                  url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
                  name: 'image1.png',
                  status: 'success',
                },
              ],
            },
            dom: [
              {
                '.t-icon-check-circle-filled': 1,
                '.t-upload__dragger-img-wrap img': {
                  attribute: { src: 'https://tdesign.gtimg.com/demo/demo-image-1.png' },
                },
              },
            ],
            snapshot: true,
          },
          {
            description:
              'theme=image & draggable=true, success file render fine with file.response.url',
            props: {
              theme: 'image',
              draggable: true,
              files: [
                {
                  response: { url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' },
                  name: 'image1.png',
                  status: 'success',
                },
              ],
            },
            dom: [
              {
                '.t-icon-check-circle-filled': 1,
                '.t-upload__dragger-img-wrap img': {
                  attribute: { src: 'https://tdesign.gtimg.com/demo/demo-image-1.png' },
                },
              },
            ],
            snapshot: true,
          },
          {
            description: 'theme=image & draggable=true, fail file render fine',
            props: {
              theme: 'image',
              draggable: true,
              files: [{ url: 'https://image4.png', name: 'image4.png', status: 'fail' }],
            },
            dom: [{ '.t-icon-error-circle-filled': 1 }],
            snapshot: true,
          },
          {
            description: 'theme=image & draggable=true, progress file render fine',
            props: {
              theme: 'image',
              draggable: true,
              files: [
                { url: 'https://image2.png', name: 'image2.png', status: 'progress', percent: 80 },
              ],
            },
            dom: [{ '.t-upload__single-percent': { text: '80%' } }],
            snapshot: true,
          },
          {
            description: 'theme=image & draggable=true, waiting file render fine',
            props: {
              theme: 'image',
              draggable: true,
              files: [{ url: 'https://image3.png', name: 'image3.png', status: 'waiting' }],
            },
            dom: [{ '.t-upload__dragger-progress-cancel': 1 }],
            snapshot: true,
          },
          {
            description:
              'theme=image & draggable=true & autoUpload=false, waiting file render fine',
            props: {
              theme: 'image',
              draggable: true,
              autoUpload: false,
              files: [{ url: 'https://image3.png', name: 'image3.png', status: 'waiting' }],
            },
            dom: [{ '.t-upload__dragger-progress-cancel': 1 }],
          },
        ],
        event: [
          {
            description:
              'theme=image & draggable=true & autoUpload=false, cancel upload works fine',
            props: {
              theme: 'image',
              draggable: true,
              autoUpload: false,
              files: [{ url: 'https://image3.png', name: 'image3.png', status: 'waiting' }],
            },
            expect: [
              {
                trigger: 'click(.t-upload__dragger-progress-cancel)',
                event: {
                  cancelUpload: [],
                  remove: [
                    {
                      file: { url: 'https://image3.png', name: 'image3.png', status: 'waiting' },
                      'e.type': 'click',
                      index: 0,
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      id: 886,
    },
    fileListDisplay: {
      PC: {
        tnode: [
          {
            description: 'theme=file, fileListDisplay works fine',
            variables: ["const fileList = getFakeFileList('file', 3);"],
            props: {
              files: '${fileList}',
              theme: 'file',
              action: 'https://tdesign.test.com/upload/file_success',
            },
            dom: [],
            trigger: '',
            params: [{ files: '${fileList}' }],
          },
          {
            description:
              'theme=image-flow && multiple=true && draggable=true, fileListDisplay works fine',
            variables: [
              "const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];",
            ],
            props: {
              files: '${fileList}',
              theme: 'image-flow',
              multiple: true,
              draggable: true,
              action: 'https://tdesign.test.com/upload/file_success',
            },
            dom: [],
            trigger: '',
            params: [{ files: '${fileList}' }],
          },
          {
            description:
              'theme=file-flow && multiple=true && draggable=true, fileListDisplay works fine',
            variables: [
              "const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];",
            ],
            props: {
              files: '${fileList}',
              theme: 'file-flow',
              multiple: true,
              draggable: true,
              action: 'https://tdesign.test.com/upload/file_success',
            },
            dom: [],
            trigger: '',
            params: [{ files: '${fileList}' }],
          },
          {
            description: 'theme=file && draggable=true, fileListDisplay works fine',
            props: {
              theme: 'file',
              draggable: true,
              files: [{ name: 'file1.txt', status: 'waiting', uploadTime: 1674897038406 }],
            },
            params: [
              { files: [{ name: 'file1.txt', status: 'waiting', uploadTime: 1674897038406 }] },
            ],
          },
          {
            description: 'theme=image && draggable=true, fileListDisplay works fine',
            props: {
              theme: 'image',
              draggable: true,
              files: [{ url: 'https://img1.txt', status: 'waiting', uploadTime: 1674897038406 }],
            },
            params: [
              {
                files: [{ url: 'https://img1.txt', status: 'waiting', uploadTime: 1674897038406 }],
              },
            ],
          },
        ],
      },
      id: 2383,
    },
    files: { id: 887 },
    format: {
      PC: {
        event: [
          {
            props: {
              format:
                "(fileRaw) => ({ field_custom: 'a new file field', name: 'another name', raw: fileRaw })",
              action: 'https://tdesign.test.com/upload/file_success',
            },
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  selectChange: [
                    '${fileList}',
                    {
                      'currentSelectedFiles[0].name': 'another name',
                      'currentSelectedFiles[0].field_custom': 'a new file field',
                      'currentSelectedFiles[0].raw': '${fileList[0]}',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      id: 884,
    },
    formatRequest: {
      PC: {
        event: [
          {
            props: {
              formatRequest: "(requestData) => ({ requestData, more_field: 'more custom field' })",
              action: 'https://tdesign.test.com/upload/fail/status_error',
            },
            description: 'upload request data can be changed through formatRequest',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  fail: [
                    {
                      'XMLHttpRequest.upload.requestParams.requestData': {
                        file: '${fileList[0]}',
                        length: 1,
                      },
                      'XMLHttpRequest.upload.requestParams.more_field': 'more custom field',
                    },
                  ],
                },
                delay: 700,
              },
            ],
          },
        ],
      },
      id: 2946,
    },
    formatResponse: {
      PC: {
        event: [
          {
            props: {
              formatResponse:
                "(response) => ({ responseData: { ret: response.ret, data: response.data }, url: response.data.url, extra_field: 'extra value' })",
              action: 'https://tdesign.test.com/upload/file_success',
            },
            expect: [
              {
                trigger: "simulateFileChange('input')",
                delay: true,
                event: {
                  change: [
                    {
                      '[0].response.responseData': {
                        ret: 0,
                        data: {
                          name: 'tdesign.min.js',
                          url: 'https://tdesign.gtimg.com/site/spline/script/tdesign.min.js',
                        },
                      },
                      '[0].response.url':
                        'https://tdesign.gtimg.com/site/spline/script/tdesign.min.js',
                      '[0].response.extra_field': 'extra value',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      id: 1220,
    },
    headers: {
      PC: {
        event: [
          {
            props: {
              headers: { 'XML-HTTP-REQUEST': 'tdesign_token' },
              action: 'https://tdesign.test.com/upload/fail/status_error',
            },
            description: '',
            expect: [
              {
                trigger: "simulateFileChange('input')",
                event: {
                  fail: [
                    { "XMLHttpRequest.upload.requestHeaders['XML-HTTP-REQUEST']": 'tdesign_token' },
                  ],
                },
                delay: true,
              },
            ],
          },
        ],
      },
      id: 878,
    },
    isBatchUpload: {
      PC: {
        event: [
          {
            props: {
              isBatchUpload: true,
              autoUpload: false,
              multiple: true,
              action: 'https://tdesign.test.com/upload/file_success',
              files: "${[{ url: 'https://file.txt', name: 'file.txt' }]}",
            },
            expect: [
              {
                trigger: "simulateFileChange('input', 'file', 3)",
                delay: 300,
                event: { change: ['length=3'] },
              },
            ],
          },
        ],
      },
      id: 2363,
    },
    locale: {
      PC: {
        props: {
          files: [
            {
              url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
              status: 'progress',
              percent: 80,
            },
          ],
          action: 'https://tdesign.test.com/upload/file_success',
        },
        dom: [
          {
            description: 'props.locale works fine if theme=file-flow',
            props: { theme: 'file-flow' },
            dom: {
              "{progress: { uploadingText: 'uploading' }}": {
                '.t-upload__file-flow-progress': { text: 'uploading 80%' },
              },
            },
          },
          {
            description: 'props.locale works fine if theme=image',
            props: { theme: 'image' },
            dom: {
              "{progress: { uploadingText: 'uploading' }}": {
                '.t-upload__image-progress': { text: 'uploading 80%' },
              },
            },
          },
        ],
      },
      id: 2733,
    },
    max: {
      PC: {
        dom: [
          {
            description: 'can not show image add trigger if count of image is over than max',
            props: {
              theme: 'image',
              max: 2,
              files: [
                { url: 'xxxx.url', name: 'file1.txt' },
                { url: 'yyyy.url', name: 'file2.txt' },
              ],
              multiple: true,
            },
            dom: [{ '.t-upload__image-add': false }],
          },
        ],
        event: [
          {
            props: {
              max: 2,
              multiple: true,
              autoUpload: false,
              files:
                "[{ url: 'xxxx.url', name: 'file1.txt' }, { url: 'yyyy.url', name: 'file2.txt' }]",
            },
            expect: [
              {
                trigger: "simulateFileChange('input', 'file', 1)",
                delay: 300,
                event: { change: 'not' },
              },
            ],
          },
          {
            description: 'max=0 means any count of files are allowed',
            props: { max: 0, multiple: true, autoUpload: false, files: '[]' },
            expect: [
              {
                trigger: "simulateFileChange('input', 'file', 3)",
                delay: 300,
                event: { change: ['length=3'] },
              },
            ],
          },
        ],
      },
      id: 1191,
    },
    method: { id: 874 },
    mockProgressDuration: { id: 3253 },
    multiple: { PC: { attribute: { multiple: true }, attributeDom: 'input' }, id: 880 },
    name: {
      PC: {
        event: [
          {
            props: {
              name: 'file_name',
              action: 'https://tdesign.test.com/upload/fail/status_error',
            },
            description: 'rename file in request data to be file_name',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  fail: [
                    {
                      'XMLHttpRequest.upload.requestParams': {
                        file_name: '${fileList[0]}',
                        length: 1,
                      },
                    },
                  ],
                },
                delay: 700,
              },
            ],
          },
        ],
      },
      id: 881,
    },
    placeholder: {
      PC: {
        dom: [
          {
            description: 'theme=file works fine',
            props: { theme: 'file', placeholder: 'this is placeholder' },
            dom: [{ '.t-upload__placeholder': { text: 'this is placeholder' } }],
          },
          {
            description: 'theme=file-input works fine',
            props: { theme: 'file-input', placeholder: 'this is placeholder' },
            dom: [{ '.t-upload__placeholder': { text: 'this is placeholder' } }],
          },
          {
            description: 'theme=image-flow works fine',
            props: { theme: 'image-flow', placeholder: 'this is placeholder' },
            dom: [{ '.t-upload__placeholder': { text: 'this is placeholder' } }],
          },
          {
            description: 'theme=file-flow works fine',
            props: { theme: 'file-flow', placeholder: 'this is placeholder' },
            dom: [{ '.t-upload__placeholder': { text: 'this is placeholder' } }],
          },
        ],
      },
      id: 1167,
    },
    requestMethod: {
      PC: {
        event: [
          {
            props: {
              theme: 'image-flow',
              multiple: true,
              files: '[]',
              requestMethod:
                "() => Promise.resolve({ status: 'success', response: { url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' } })",
            },
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input', 'image')",
                delay: 300,
                event: {
                  change: [
                    {
                      '[0].raw': '${fileList[0]}',
                      '[0].response.url': 'https://tdesign.gtimg.com/demo/demo-image-1.png',
                    },
                  ],
                },
              },
            ],
          },
          {
            props: {
              theme: 'file-flow',
              multiple: true,
              files: '[]',
              requestMethod: "() => Promise.resolve({ status: 'fail', error: 'upload failed' })",
            },
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                delay: 300,
                event: {
                  fail: [
                    {
                      'failedFiles.map(t => t.raw)': '${fileList}',
                      'currentFiles.map(t => t.raw)': '${fileList}',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      id: 1789,
    },
    showUploadProgress: {
      PC: {
        dom: [
          {
            props: {
              theme: 'file-flow',
              showUploadProgress: false,
              files: [
                {
                  name: 'file1.txt',
                  status: 'progress',
                  percent: 80,
                  url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
                },
              ],
              action: 'https://tdesign.test.com/upload/file_success',
            },
            dom: [{ '.t-upload__file-flow-progress': { text: '上传中' } }],
          },
          {
            props: {
              theme: 'image',
              showUploadProgress: false,
              files: [
                {
                  name: 'file1.txt',
                  status: 'progress',
                  percent: 10,
                  url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
                },
              ],
              action: 'https://tdesign.test.com/upload/file_success',
            },
            dom: [{ '.t-upload__image-progress': { text: '上传中' } }],
          },
        ],
      },
      id: 1790,
    },
    sizeLimit: {
      PC: {
        event: [
          {
            description: 'file size is over than 23B, show default error tips',
            props: {
              sizeLimit: { size: 23, unit: 'B' },
              multiple: true,
              action: 'https://tdesign.test.com/upload/file_success',
            },
            expect: [
              {
                trigger: "simulateFileChange('input', 'file', 5)",
                delay: 100,
                event: { validate: [{ type: 'FILE_OVER_SIZE_LIMIT', files: 'length=3' }] },
              },
            ],
          },
          {
            description: 'file size is over than 23B, show custom error tips',
            props: {
              sizeLimit: {
                size: 23,
                unit: 'B',
                message: 'image size can not over than {sizeLimit}',
              },
              multiple: true,
              action: 'https://tdesign.test.com/upload/file_success',
            },
            expect: [
              {
                trigger: "simulateFileChange('input', 'file', 5)",
                delay: 100,
                dom: [
                  {
                    '.t-upload__single .t-upload__tips-error': {
                      text: 'image size can not over than 23',
                    },
                  },
                ],
                event: { validate: [{ type: 'FILE_OVER_SIZE_LIMIT', files: 'length=3' }] },
              },
            ],
          },
          {
            description:
              'file size is over than 0.023KB, show default error tips (KB is default unit)',
            props: {
              sizeLimit: 0.023,
              multiple: true,
              action: 'https://tdesign.test.com/upload/file_success',
            },
            expect: [
              {
                trigger: "simulateFileChange('input', 'file', 5)",
                delay: 100,
                event: { validate: [{ type: 'FILE_OVER_SIZE_LIMIT', files: 'length=3' }] },
              },
            ],
          },
        ],
      },
      id: 1564,
    },
    status: {
      PC: {
        props: { tips: 'upload tips text', action: 'https://tdesign.test.com/upload/file_success' },
        dom: [
          '.t-upload__tips-default',
          '.t-upload__tips-success',
          '.t-upload__tips-warning',
          '.t-upload__tips-error',
        ],
      },
      id: 2994,
    },
    theme: {
      PC: {
        dom: [
          {
            description: 'show image add trigger even if count of image is over than max',
            props: {
              files: [
                { url: 'xxxx.url', name: 'file1.txt' },
                { url: 'yyyy.url', name: 'file2.txt' },
              ],
              multiple: true,
              theme: 'image',
            },
            dom: ['.t-upload__image-add'],
          },
          {
            description: 'theme=file and file status is fail works fine',
            props: {
              theme: 'file',
              autoUpload: false,
              files: [{ name: 'file1.txt', status: 'fail' }],
            },
            dom: ['.t-icon-error-circle-filled'],
          },
          {
            description: 'theme=file-input and file status is progress works fine',
            props: { theme: 'file-input', files: [{ name: 'file1.txt', status: 'progress' }] },
            dom: ['.t-upload__single-progress'],
          },
          {
            description: 'theme=file-input and file status is waiting works fine',
            props: { theme: 'file-input', files: [{ name: 'file1.txt', status: 'waiting' }] },
            dom: ['.t-upload__file-waiting.t-icon-time-filled'],
          },
          {
            description: 'theme=file-input and file status is fail works fine',
            props: { theme: 'file-input', files: [{ name: 'file1.txt', status: 'fail' }] },
            dom: ['.t-icon-error-circle-filled'],
          },
          {
            description: 'theme=file-input and file status is success works fine',
            props: { theme: 'file-input', files: [{ name: 'file1.txt', status: 'success' }] },
            dom: ['.t-icon-check-circle-filled'],
          },
          {
            description: 'theme=file-flow works fine',
            props: {
              theme: 'file-flow',
              files: [
                { name: 'file1.txt', status: 'success' },
                { name: 'file2.txt', status: 'waiting' },
                { name: 'file3.txt', status: 'fail' },
                { name: 'file4.txt', status: 'progress', percent: 90 },
              ],
            },
            dom: [{ '.t-upload__flow-table tbody > tr': 4 }],
            snapshot: true,
          },
          {
            description: 'theme=image-flow works fine',
            props: {
              theme: 'image-flow',
              files: [
                { url: '', status: 'success', name: 'img.txt' },
                { url: 'https://img1.txt', status: 'success', name: 'img1.txt' },
                { url: 'https://img2.txt', status: 'waiting', name: 'img2.txt' },
                { url: 'https://img3.txt', status: 'fail', name: 'img3.txt' },
                { url: 'https://img4.txt', status: 'progress', percent: 90, name: 'img4.txt' },
              ],
            },
            dom: [{ '.t-upload__card-item': 5 }],
            snapshot: true,
          },
        ],
      },
      id: 1182,
    },
    tips: {
      PC: {
        props: { action: 'https://tdesign.test.com/upload/file_success' },
        tnode: { dom: ['.t-upload__tips'], trigger: '' },
      },
      id: 1183,
    },
    trigger: {
      PC: {
        tnode: [
          {
            description: 'theme = file, trigger works fine',
            props: { theme: 'file' },
            snapshot: true,
          },
          {
            description: 'theme = custom & draggable = true, trigger works fine',
            props: { theme: 'custom', draggable: true },
            params: [{ dragActive: false, files: [] }],
            snapshot: true,
          },
          {
            description: 'theme = custom, trigger works fine',
            props: { theme: 'custom' },
            snapshot: true,
          },
          {
            description: 'theme = custom, trigger is right with files',
            props: {
              theme: 'custom',
              draggable: true,
              files: [{ name: 'file-name.txt', status: 'progress' }],
            },
            params: [{ dragActive: false, files: [{ name: 'file-name.txt', status: 'progress' }] }],
            snapshot: true,
          },
        ],
      },
      id: 889,
    },
    triggerButtonProps: {
      PC: {
        props: { action: 'https://tdesign.test.com/upload/file_success' },
        dom: { "{ theme: 'warning' }": { '.t-button--theme-warning': 1 } },
      },
      id: 2985,
    },
    uploadAllFilesInOneRequest: { id: 2362 },
    useMockProgress: { id: 1987 },
    withCredentials: {
      PC: {
        event: [
          {
            props: {
              withCredentials: true,
              action: 'https://tdesign.test.com/upload/fail/status_error',
            },
            description: '',
            expect: [
              {
                trigger: "simulateFileChange('input')",
                event: { fail: [{ 'XMLHttpRequest.withCredentials': true }] },
                delay: true,
              },
            ],
          },
        ],
      },
      id: 882,
    },
    cancelUpload: { id: 1791 },
    change: {
      PC: {
        event: [
          {
            description: 'can trigger change if autoUpload is false for image',
            props: { theme: 'image', draggable: true, autoUpload: false, files: [] },
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input', 'image', 1)",
                event: {
                  change: [
                    { '[0].raw': '${fileList[0]}' },
                    { trigger: 'add', index: 0, 'file.raw': '${fileList[0]}' },
                  ],
                },
                delay: 100,
              },
            ],
          },
          {
            description: 'can trigger change if autoUpload is false for image-flow',
            props: {
              theme: 'image-flow',
              draggable: true,
              autoUpload: false,
              multiple: true,
              files: [{ url: 'https://image1.png', status: 'success' }],
            },
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input', 'image', 1)",
                event: {
                  change: [
                    {
                      '[0]': { url: 'https://image1.png', status: 'success' },
                      '[1].raw': '${fileList[0]}',
                    },
                    {
                      trigger: 'add',
                      index: 1,
                      'file.raw': '${fileList[0]}',
                      'files.map(t => t.raw)': '${fileList}',
                    },
                  ],
                },
                delay: 100,
              },
            ],
          },
        ],
      },
      id: 888,
    },
    dragenter: {
      PC: {
        event: [
          {
            description: 'drag image enter, trigger onDragenter event',
            props: { theme: 'image', draggable: true },
            expect: [
              {
                trigger:
                  "const files = simulateDragFileChange('.t-upload__dragger', 'dragEnter', 'image')",
                event: {
                  dragenter: [{ 'e.type': 'dragenter', 'e.dataTransfer.files': '${files}' }],
                },
              },
              { trigger: "simulateDragFileChange('.t-upload__dragger', 'dragOver')" },
              {
                trigger: "simulateDragFileChange('.t-upload__dragger', 'dragLeave')",
                event: {
                  dragleave: [{ 'e.type': 'dragleave', 'e.dataTransfer.files': '${files}' }],
                },
              },
            ],
          },
          {
            description: 'drag file enter, trigger onDragenter event',
            props: { theme: 'file', draggable: true },
            expect: [
              {
                trigger: "const files = simulateDragFileChange('.t-upload__dragger', 'dragEnter')",
                event: {
                  dragenter: [{ 'e.type': 'dragenter', 'e.dataTransfer.files': '${files}' }],
                },
              },
              { trigger: "simulateDragFileChange('.t-upload__dragger', 'dragOver')" },
              {
                trigger: "simulateDragFileChange('.t-upload__dragger', 'dragLeave')",
                event: {
                  dragleave: [{ 'e.type': 'dragleave', 'e.dataTransfer.files': '${files}' }],
                },
              },
            ],
          },
        ],
      },
      id: 1184,
    },
    dragleave: { id: 1185 },
    drop: {
      PC: {
        event: [
          {
            description: 'drag image drop, trigger onDrop event',
            props: {
              theme: 'image',
              draggable: true,
              action: 'https://tdesign.test.com/upload/file_success',
            },
            expect: [
              {
                trigger:
                  "const files = simulateDragFileChange('.t-upload__dragger', 'drop', 'image')",
                event: { drop: [{ 'e.type': 'drop', 'e.dataTransfer.files': '${files}' }] },
              },
            ],
          },
          {
            description: 'drag file drop, trigger onDrop event',
            props: {
              theme: 'file',
              draggable: true,
              action: 'https://tdesign.test.com/upload/file_success',
            },
            expect: [
              {
                trigger: "const files = simulateDragFileChange('.t-upload__dragger', 'drop')",
                event: { drop: [{ 'e.type': 'drop', 'e.dataTransfer.files': '${files}' }] },
              },
            ],
          },
        ],
      },
      id: 2628,
    },
    fail: {
      PC: {
        event: [
          {
            props: { action: 'https://tdesign.test.com/upload/fail/status_error' },
            description: '',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  fail: [
                    {
                      'XMLHttpRequest.upload.requestParams': { file: '${fileList[0]}', length: 1 },
                    },
                  ],
                },
                delay: 700,
              },
            ],
          },
        ],
      },
      id: 892,
    },
    oneFileFail: { id: 2984 },
    oneFileSuccess: { id: 2945 },
    preview: {
      PC: {
        event: [
          {
            description: 'single image preview works fine',
            props: {
              files: [
                {
                  url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
                  name: 'demo-image-1.png',
                },
              ],
              theme: 'image',
            },
            expect: [
              { trigger: 'mouseenter(.t-upload__card-item)' },
              {
                trigger: 'click(.t-icon-browse)',
                delay: 300,
                exist: [
                  {
                    '.t-image-viewer__modal-image': {
                      attribute: { src: 'https://tdesign.gtimg.com/demo/demo-image-1.png' },
                    },
                  },
                ],
                event: {
                  preview: [
                    {
                      file: {
                        url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
                        name: 'demo-image-1.png',
                      },
                      index: 0,
                      'e.type': 'click',
                    },
                  ],
                },
              },
            ],
          },
          {
            description: 'multiple image preview works fine',
            props: {
              files: [
                {
                  url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
                  name: 'demo-image-1.png',
                },
                { url: 'https://tdesign.gtimg.com/site/avatar.jpg', name: 'avatar.jpg' },
              ],
              theme: 'image',
              multiple: true,
            },
            expect: [
              { trigger: 'mouseenter(.t-upload__card-item:last-child)' },
              {
                trigger: 'click(.t-upload__card-item:nth-child(2) .t-icon-browse)',
                delay: 300,
                exist: [
                  {
                    '.t-image-viewer__modal-image': {
                      attribute: { src: 'https://tdesign.gtimg.com/site/avatar.jpg' },
                    },
                  },
                ],
                event: {
                  preview: [
                    {
                      file: {
                        url: 'https://tdesign.gtimg.com/site/avatar.jpg',
                        name: 'avatar.jpg',
                      },
                      index: 1,
                      'e.type': 'click',
                    },
                  ],
                },
              },
            ],
          },
          {
            description: 'theme=image-flow, image preview works fine',
            props: {
              files: [
                {
                  url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
                  name: 'demo-image-1.png',
                },
                { url: 'https://tdesign.gtimg.com/site/avatar.jpg', name: 'avatar.jpg' },
              ],
              theme: 'image-flow',
              multiple: true,
            },
            expect: [
              { trigger: 'mouseenter(.t-upload__card-item:nth-child(2))' },
              {
                trigger: 'click(.t-upload__card-item:nth-child(2) .t-icon-browse)',
                delay: 300,
                exist: [
                  {
                    '.t-image-viewer__modal-image': {
                      attribute: { src: 'https://tdesign.gtimg.com/site/avatar.jpg' },
                    },
                  },
                ],
                event: {
                  preview: [
                    {
                      file: {
                        url: 'https://tdesign.gtimg.com/site/avatar.jpg',
                        name: 'avatar.jpg',
                      },
                      index: 1,
                      'e.type': 'click',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      id: 893,
    },
    progress: { id: 890 },
    remove: {
      PC: {
        event: [
          {
            description: 'remove single file, trigger remove event',
            props: { files: [{ name: 'file1.txt', url: 'https://xxx1.txt' }] },
            expect: [
              {
                trigger: 'click(.t-upload__icon-delete)',
                event: {
                  change: [[], { 'e.type': 'click' }],
                  remove: [{ index: 0, file: 'toBeTruthy', 'e.type': 'click' }],
                },
              },
            ],
          },
          {
            description: 'remove only one of file list, trigger remove event',
            props: {
              multiple: true,
              files: [
                { name: 'file1.txt', url: 'https://xxx1.txt' },
                { name: 'file2.txt', url: 'https://xxx2.txt' },
                { name: 'file3.txt', url: 'https://xxx3.txt' },
              ],
            },
            expect: [
              {
                trigger: 'click(.t-upload__single-display-text .t-upload__icon-delete)',
                event: {
                  change: [
                    [
                      { name: 'file2.txt', url: 'https://xxx2.txt' },
                      { name: 'file3.txt', url: 'https://xxx3.txt' },
                    ],
                    { index: 0, file: 'toBeTruthy', 'e.type': 'click' },
                  ],
                  remove: [{ index: 0, file: 'toBeTruthy', 'e.type': 'click' }],
                },
              },
            ],
          },
          {
            description: 'failed image file can be removed',
            props: {
              theme: 'image',
              multiple: true,
              files: [{ name: 'image1.png', status: 'fail' }],
            },
            expect: [
              {
                trigger: 'click(.t-upload__card-mask-item .t-icon-delete)',
                event: {
                  change: [[], { index: 0, file: 'toBeTruthy', 'e.type': 'click' }],
                  remove: [{ index: 0, file: 'toBeTruthy', 'e.type': 'click' }],
                },
              },
            ],
          },
          {
            description: 'success status image can be removed',
            props: {
              theme: 'image',
              multiple: true,
              files: [{ url: 'https://image1.png', status: 'success' }],
            },
            expect: [
              {
                trigger: 'click(.t-upload__card-mask-item .t-icon-delete)',
                event: {
                  change: [[], { index: 0, file: 'toBeTruthy', 'e.type': 'click' }],
                  remove: [{ index: 0, file: 'toBeTruthy', 'e.type': 'click' }],
                },
              },
            ],
          },
          {
            description: 'theme=file-input, file can be removed to be empty',
            props: { theme: 'file-input', files: [{ name: 'file.txt', status: 'success' }] },
            expect: [
              {
                trigger: 'click(.t-upload__single-input-clear)',
                event: { change: [[]], remove: [{ 'e.type': 'click' }] },
              },
            ],
          },
          {
            description: 'theme=file-flow, remove file, trigger remove event',
            props: {
              theme: 'file-flow',
              multiple: true,
              files: [{ name: 'file1.txt', url: 'https://xxx1.txt' }],
            },
            expect: [
              {
                trigger: 'click(.t-upload__delete)',
                event: {
                  change: [[], { 'e.type': 'click' }],
                  remove: [{ index: 0, file: 'toBeTruthy', 'e.type': 'click' }],
                },
              },
            ],
          },
          {
            description: 'theme=image-flow, remove file, trigger remove event',
            props: {
              theme: 'image-flow',
              multiple: true,
              files: [{ name: 'file1.txt', url: 'https://xxx1.txt' }],
            },
            expect: [
              {
                trigger: 'click(.t-upload__delete)',
                event: {
                  change: [[], { 'e.type': 'click' }],
                  remove: [{ index: 0, file: 'toBeTruthy', 'e.type': 'click' }],
                },
              },
            ],
          },
          {
            description:
              'theme=file-flow & isBatchUpload=true, remove all files if click delete node',
            props: {
              theme: 'file-flow',
              multiple: true,
              isBatchUpload: true,
              files: [
                { name: 'file1.txt', url: 'https://xxx1.txt' },
                { name: 'file2.txt', url: 'https://xxx2.txt' },
              ],
            },
            expect: [
              {
                trigger: 'click(.t-upload__delete)',
                event: {
                  change: [[], { 'e.type': 'click' }],
                  remove: [{ index: -1, file: 'undefined', 'e.type': 'click' }],
                },
              },
            ],
          },
          {
            description: 'theme=image & draggable=true, success file can be removed',
            props: {
              theme: 'image',
              draggable: true,
              files: [{ url: 'https://www.image.png', status: 'success' }],
            },
            expect: [
              {
                trigger: 'click(.t-upload__dragger-delete-btn)',
                event: {
                  change: [[], { 'e.type': 'click' }],
                  remove: [
                    {
                      index: 0,
                      file: { url: 'https://www.image.png', status: 'success' },
                      'e.type': 'click',
                    },
                  ],
                },
              },
            ],
          },
          {
            description: 'theme=file & multiple=true & autoUpload=false',
            props: {
              theme: 'file',
              multiple: true,
              autoUpload: false,
              files: [
                { name: 'file1.txt' },
                { name: 'file2.txt', status: 'success' },
                { name: 'file3.txt', status: 'waiting' },
              ],
            },
            expect: [
              {
                trigger: 'click(.t-upload__single-display-text:last-child .t-upload__icon-delete)',
                event: {
                  change: [[{ name: 'file1.txt' }, { name: 'file2.txt', status: 'success' }]],
                  remove: [
                    { index: 2, file: { name: 'file3.txt', status: 'waiting' }, 'e.type': 'click' },
                  ],
                },
              },
            ],
          },
          {
            description: 'theme=file-flow & multiple=true & autoUpload=true, remove success file',
            props: {
              theme: 'file-flow',
              multiple: true,
              autoUpload: true,
              files: [
                { name: 'file1.txt' },
                { name: 'file2.txt', status: 'success' },
                { name: 'file3.txt', status: 'waiting' },
                { name: 'file4.txt', status: 'fail' },
              ],
            },
            expect: [
              {
                trigger: 'click(.t-upload__flow-table tr:nth-child(2) .t-upload__delete)',
                event: {
                  change: [
                    [
                      { name: 'file1.txt' },
                      { name: 'file3.txt', status: 'waiting' },
                      { name: 'file4.txt', status: 'fail' },
                    ],
                  ],
                  remove: [
                    { index: 1, file: { name: 'file2.txt', status: 'success' }, 'e.type': 'click' },
                  ],
                },
              },
            ],
          },
          {
            description: 'theme=file-flow & multiple=true & autoUpload=true, remove waiting file',
            props: {
              theme: 'file-flow',
              multiple: true,
              autoUpload: true,
              files: [
                { name: 'file1.txt' },
                { name: 'file2.txt', status: 'success' },
                { name: 'file3.txt', status: 'waiting' },
                { name: 'file4.txt', status: 'fail' },
              ],
            },
            expect: [
              {
                trigger: 'click(.t-upload__flow-table tr:nth-child(3) .t-upload__delete)',
                event: {
                  change: [
                    [
                      { name: 'file1.txt' },
                      { name: 'file2.txt', status: 'success' },
                      { name: 'file4.txt', status: 'fail' },
                    ],
                  ],
                  remove: [
                    { index: 2, file: { name: 'file3.txt', status: 'waiting' }, 'e.type': 'click' },
                  ],
                },
              },
            ],
          },
        ],
      },
      id: 1170,
    },
    selectChange: { id: 2337 },
    success: { id: 891 },
    validate: { id: 2929 },
    waitingUploadFilesChange: { id: 2947 },
    triggerUpload: { id: 2989 },
    uploadFiles: { id: 2990 },
    '<T extends UploadFile = UploadFile>': { id: 2996 },
  },
  UploadFile: {
    lastModified: { id: 1177 },
    name: { id: 1179 },
    percent: { id: 1181 },
    raw: { id: 982 },
    response: { id: 1186 },
    size: { id: 1178 },
    status: { id: 979 },
    type: { id: 1180 },
    uploadTime: { id: 2993 },
    url: { id: 981 },
    PlainObject: { id: 3308 },
  },
};
