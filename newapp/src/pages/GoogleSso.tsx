'use client';

import {useEffect} from "react";
import {LoadingOverlay} from "common";
import {GithubSso} from "../cloud/model/github-sso.ts";
import {useHostClient} from "../hooks/use-host-client.tsx";
import {GoogleSso, GoogleSsoEntityInfo} from "../cloud/model/google-sso.ts";

export const GoogleSsoPage = () => {
    const urlParams = new URLSearchParams(window.location.hash);
    const accessToken = urlParams.get('#access_token');
    const client = useHostClient()

    const githubSsoRepo = client.repo<GoogleSso>(GoogleSsoEntityInfo)

    useEffect(() => {
        githubSsoRepo.create({
            code: accessToken
        } as GithubSso).then(resp => {
            const token = (resp.details! as any).token

            client.authenticateWithToken(token);

            window.location.href = '/cloud'
        })
    }, [accessToken])

    useEffect(() => {
        if (client.isAuthenticated()) {
            window.location.href = '/cloud'
        }
    }, []);

    return <LoadingOverlay/>
};

