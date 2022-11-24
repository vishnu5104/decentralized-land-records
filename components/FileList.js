import React from 'react';

import { computeAddress } from '@arcana/auth';
import getStorageProvider from '../utils/storageProvider';
let i = 1;
export class FileList extends React.Component {
    state = {
        files: [],
        downloader: null,
        access: null,
    };

    async loadFiles() {
        const sp = await getStorageProvider();

        const downloader = await sp.getDownloader();
        const access = await sp.getAccess();
        const files = await sp.myFiles();

        this.setState({
            downloader,
            access,
            files: files.map((f) => {
                f.download = () => {
                    downloader.download(f.did).catch((e) => window.alert(e));
                };

                f.delete = () => {
                    access.deleteFile(f.did).catch((e) => window.alert(e));
                };
                f.share = async () => {
                    const addr = window.prompt('Enter an address:');

                    console.log(addr);
                    console.log('didi');

                    // access.share(['0x' + f.did], [addr]).catch((e) => window.alert(e));
                    await access.share(f.did, addr);
                    console.log('sucess');
                };
                console.log(files[0]);
                return f;
            }),
        });
    }

    componentDidMount() {
        this.loadFiles().catch((e) => console.error(e));
    }

    render() {
        return (
            <table class="center">
                <tr>
                    <th>S.NO</th>
                    <th>DID</th>
                    <th>Uploaded On</th>
                    <th>Size</th>
                    <th>Actions</th>
                </tr>

                <tbody>
                    {this.state.files.map((file) => (
                        <tr key={file.did}>
                            <td className="border px-8 py-4">{i++}</td>
                            <td className="border px-8 py-4">{file.did}</td>
                            <td className="border px-8 py-4">{file.uploaded_on}</td>{' '}
                            <td className="border px-8 py-4">{file.size} bytes</td>
                            <td className="button-container border px-8 py-4">
                                <button class="btn-c" onClick={file.download}>
                                    Download
                                </button>
                                <button class="btn-c" onClick={file.delete}>
                                    Delete
                                </button>
                                {i !== 4 ? (
                                    <button class="btn-c" onClick={file.share}>
                                        Share
                                    </button>
                                ) : (
                                    <p class="btn-c">G-ID Can't be share</p>
                                )}
                                {console.log(file[0])}
                                {console.log('lkl')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
