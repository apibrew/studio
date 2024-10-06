'use client';

import {useRepository} from "@apibrew/react";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {LoadingOverlay} from "common";
import {GithubSso, GithubSsoEntityInfo} from "../cloud/model/github-sso.ts";
import {useHostClient} from "../hooks/use-host-client.tsx";

export const GithubSsoPage = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const client = useHostClient()

    const githubSsoRepo = client.repo<GithubSso>(GithubSsoEntityInfo)

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

