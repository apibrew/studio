'use client';

import {useClient, useRepository} from "@apibrew/react";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {GithubSso, GithubSsoEntityInfo} from "../model/github-sso";
import {LoadingOverlay} from "common";

export const GithubSsoPage = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const githubSsoRepo = useRepository<GithubSso>(GithubSsoEntityInfo)
    const client = useClient()

    useEffect(() => {
        githubSsoRepo.create({
            code: code
        } as GithubSso).then(resp => {
            const token = (resp.details! as any).token

            client.authenticateWithToken(token);

            window.location.href = '/cloud'
        })
    }, [code])

    useEffect(() => {
        if (client.isAuthenticated()) {
            window.location.href = '/cloud'
        }
    }, []);

    return <LoadingOverlay/>
};

