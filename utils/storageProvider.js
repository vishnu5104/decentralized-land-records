import { AuthProvider } from '@arcana/auth';
import { StorageProvider } from '@arcana/storage';
import { providers } from 'ethers';

let auth;
let storageProvider;

export async function getAuthInstance() {
    if (!auth) {
        auth = new AuthProvider(process.env.NEXT_PUBLIC_REACT_APP_ARCANA_APP_ID);
    }
    await auth.init({ appMode: 2, position: 'right' });
    return auth;
}

export async function getWalletInstance() {
    auth = new AuthProvider(process.env.NEXT_PUBLIC_REACT_APP_ARCANA_APP_ID);
    await auth.init({ position: 'right' });

    return auth.provider;
}

export async function connect() {
    console.log('Requesting connect wallet');
    // setRequest('connect_wallet');

    try {
        const provider = await auth.connect();

        console.log({ provider });
    } catch (error) {
        console.log({ error });
    }
}

export async function getLoggedInStatus() {
    const auth = await getAuthInstance();
    const connected = await auth.isLoggedIn();
    return connected;
}

export async function loginViaGoogle() {
    auth = await getAuthInstance();
    let connected = await auth.isLoggedIn();
    if (!connected) {
        await auth.loginWithSocial('google');
        connected = await auth.isLoggedIn();
    }
    return connected;
}

export async function getArcanaProviderOrSigner(needSigner = false) {
    const auth = await getAuthInstance();
    const provider = await auth.provider;
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
        return;
    }

    if (needSigner) {
        return web3Provider.getSigner();
    }

    return web3Provider;
}

export async function setHooks(setChainId) {
    const auth = await getAuthInstance();
    const provider = await auth.provider;
    provider.on('connect', async (params) => {});
    provider.on('accountsChanged', (params) => {
        //Handle
        // console.log({ type: "accountsChanged", params: params });
    });
    provider.on('chainChanged', async (params) => {
        // console.log({ type: "chainChanged", params: params });
        setChainId(params.chainId);
        localStorage.setItem('chainId', params.chainId);
    });
}

export default async function getStorageProvider(provider) {
    if (!storageProvider) {
        storageProvider = new StorageProvider({
            appId: process.env.NEXT_PUBLIC_REACT_APP_ARCANA_APP_ID,
            // gateway: 'https://gateway-dev.arcana.network/api/v1/',
            provider,
        });
    }

    return storageProvider;
}
// export function setResult(value) {
//     let account = value;
//     return account;
// }
export async function getAccounts() {
    let from = '';
    console.log('Requesting accounts');
    try {
        setRequest('eth_accounts');
        const provider = await auth;
        const accounts = await provider.request({ method: 'eth_accounts' });
        console.log({ accounts });
        from = accounts[0];
        // setAccount(from);
        // setResult(from);
    } catch (e) {
        console.log(e);
        console.log({ e });
    }
}
