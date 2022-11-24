import React from 'react';

import getStorageProvider from '../utils/storageProvider';

import Button from './Button';
import Loader from './Loader';

export class UploadFile extends React.Component {
    onRef = (el) => {
        this.inputRef = el;
    };

    onSubmit = async (ev) => {
        ev.preventDefault();

        const sp = await getStorageProvider();
        const uploader = await sp.getUploader();

        uploader.onSuccess = () => {
            window.alert('File uploaded.');
            // window.location.reload();
        };

        for (const file of this.inputRef.files) {
            await uploader.upload(file);
            // console.log(this.inputRef.files);
            let FileList = this.inputRef.files;
            console.log(FileList);
            console.log('okl');
        }
    };

    render() {
        return (
            <div>
                <div className="flex gap-40">
                    <form class="content" onSubmit={this.onSubmit}>
                        <label class="sty" htmlFor="upload-file-input">
                            <h1 className="mt-10 text-[24px]">Submit three documents in one go</h1>
                        </label>

                        <input id="upload-file-input" type="file" ref={this.onRef} multiple />
                        <button
                            type="submit"
                            className="rounded-md nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white"
                        >
                            Submit documents
                        </button>
                    </form>

                    <div>
                        <form class="content" onSubmit={this.onSubmit}>
                            <h1 className="mt-10 text-[24px]">
                                Submit each documents individually
                            </h1>
                            <label class="sty" htmlFor="upload-file-input">
                                Property sale deed
                            </label>

                            <input
                                id="upload-file-input"
                                type="file"
                                ref={(element) => (this.textInput = element)}
                            />
                            <button
                                type="submit"
                                className="rounded-md nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white"
                            >
                                Submit documents
                            </button>
                            <br></br>
                            <label class="sty" htmlFor="upload-file-input">
                                Property sale deed
                            </label>

                            <input
                                id="upload-file-input"
                                type="file"
                                ref={(element) => (this.textInput = element)}
                            />
                            <button
                                type="submit"
                                className="rounded-md nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white"
                            >
                                Submit documents
                            </button>
                            <br></br>
                            <label class="sty" htmlFor="upload-file-input">
                                Property sale deed
                            </label>

                            <input
                                id="upload-file-input"
                                type="file"
                                ref={(element) => (this.textInput = element)}
                            />
                            <button
                                type="submit"
                                className="rounded-md nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white"
                            >
                                Submit documents
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
