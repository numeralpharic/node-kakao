import { Long } from 'bson';
import { EventContext, TypedEmitter } from '../../event';
import { InformedOpenLink, OpenChannel, OpenLink, OpenLinkChannelTemplate, OpenLinkComponent, OpenLinkCreateTemplate, OpenLinkKickedUser, OpenLinkKickedUserInfo, OpenLinkProfiles, OpenLinkProfileTemplate, OpenLinkService, OpenLinkSession, OpenLinkUpdateTemplate } from '../../openlink';
import { AsyncCommandResult, DefaultRes } from '../../request';
import { TalkSession } from '../client';
import { OpenLinkEvent, OpenLinkListEvents } from '../event';
import { Managed } from '../managed';
import { OpenLinkUpdater } from './talk-open-link-handler';
export declare class TalkClientLinkStore extends TypedEmitter<OpenLinkListEvents> implements OpenLinkSession, OpenLinkService, OpenLinkUpdater, Managed<OpenLinkListEvents> {
    private _map;
    private _linkHandler;
    private _linkSession;
    constructor(session: TalkSession, clientLinkList: InformedOpenLink[]);
    getLatestLinkList(): AsyncCommandResult<Readonly<InformedOpenLink>[]>;
    getOpenLink(...components: OpenLinkComponent[]): AsyncCommandResult<Readonly<OpenLink>[]>;
    getJoinInfo(linkURL: string, referer?: string): AsyncCommandResult<Readonly<InformedOpenLink>>;
    getKickList(link: OpenLinkComponent): AsyncCommandResult<OpenLinkKickedUserInfo[]>;
    removeKicked(link: OpenLinkComponent, kickedUser: OpenLinkKickedUser): AsyncCommandResult;
    deleteLink(link: OpenLinkComponent): AsyncCommandResult;
    react(link: OpenLinkComponent, flag: boolean): AsyncCommandResult;
    getReaction(link: OpenLinkComponent): AsyncCommandResult<[number, boolean]>;
    createOpenChannel(template: OpenLinkChannelTemplate & OpenLinkCreateTemplate, profile: OpenLinkProfiles): AsyncCommandResult<OpenChannel>;
    createOpenDirectProfile(template: OpenLinkChannelTemplate & OpenLinkCreateTemplate, profile: OpenLinkProfiles): AsyncCommandResult<InformedOpenLink>;
    createOpenProfile(template: OpenLinkProfileTemplate & OpenLinkCreateTemplate): AsyncCommandResult<InformedOpenLink>;
    updateOpenLink(link: OpenLinkComponent, settings: (OpenLinkChannelTemplate | OpenLinkProfileTemplate) & OpenLinkUpdateTemplate): AsyncCommandResult<InformedOpenLink>;
    addClientLink(link: InformedOpenLink): void;
    deleteClientLink(linkId: Long): boolean;
    allClientLink(): IterableIterator<InformedOpenLink>;
    getClientLink(linkId: Long): InformedOpenLink | undefined;
    get clientLinkCount(): number;
    pushReceived(method: string, data: DefaultRes, parentCtx: EventContext<OpenLinkEvent>): Promise<void>;
}
