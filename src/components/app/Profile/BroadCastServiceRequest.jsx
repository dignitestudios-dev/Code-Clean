import React, { useEffect, useMemo, useState } from 'react';
import { CiEdit, CiLocationOn, CiSearch } from 'react-icons/ci';
import { FaChevronRight } from 'react-icons/fa';
import { LuTrash2 } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchUserProfile } from '../../../redux/slices/users.slice';

const statusStyles = {
    pending: 'bg-amber-100 text-amber-700',
    in_progress: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-rose-100 text-rose-700',
};

const humanizeStatus = (s = '') => {
    const map = {
        pending: 'Pending',
        in_progress: 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled',
    };
    return map[s.toLowerCase()] ?? s;
};

const canDelete = (req) => {
    // allow delete only if pending and no booking is attached
    return (req?.status || '').toLowerCase() === 'pending' && !req?.booking_id;
};

const BroadcastServiceRequests = ({ setCustombooking, setIsOpen, setIsRestrict, setSelectedData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const { userProfile, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [userdata, setUserdata] = useState(null);

    // initial + page-based fetch
    useEffect(() => {
        // first load
        dispatch(fetchUserProfile({ page: 1 }));
    }, [dispatch]);

    // when API returns, keep local copy + sync currentPage
    useEffect(() => {
        if (userProfile) {
            setUserdata(userProfile);
            const apiPage = userProfile?.broadcast_requests?.current_page ?? 1;
            setCurrentPage(apiPage);
        }
    }, [userProfile]);

    const br = userdata?.broadcast_requests;
    const list = br?.data ?? [];
    const lastPage = br?.last_page ?? 1;
    const total = br?.total ?? list.length;
    const shownFrom = br?.from ?? (list.length ? (currentPage - 1) * (br?.per_page ?? list.length) + 1 : 0);
    const shownTo = br?.to ?? ((br?.per_page ?? list.length) * (currentPage - 1) + list.length);

    const requests = useMemo(() => {
        if (!searchTerm) return list;
        const q = searchTerm.toLowerCase();
        return list.filter(
            (r) =>
                r?.title?.toLowerCase().includes(q) ||
                r?.location?.toLowerCase().includes(q) ||
                r?.city?.toLowerCase().includes(q) ||
                r?.state?.toLowerCase().includes(q)
        );
    }, [list, searchTerm]);

    const handleDelete = (req) => {
        if (canDelete(req)) {
            setSelectedData(req)
            setIsOpen(true);
        } else {
            setIsRestrict(true);
        }
    };

    const goToPage = (page) => {
        if (page < 1 || page > lastPage || page === currentPage) return;
        setCurrentPage(page);
        dispatch(fetchUserProfile({ page }));
    };

    const isSkeleton = isLoading || !userdata;

    // helper to render page buttons compactly if needed (simple full range here)
    const renderPageButtons = () => {
        const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
        return pages.map((p) => (
            <button
                key={p}
                onClick={() => goToPage(p)}
                disabled={isLoading}
                className={`min-w-9 h-9 px-3 rounded-md border text-sm transition
          ${p === currentPage ? 'bg-[#00034A] text-white border-[#00034A]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}
        `}
                aria-current={p === currentPage ? 'page' : undefined}
            >
                {p}
            </button>
        ));
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Broadcast Service Requests
                    <span className="ml-2 text-sm text-gray-500">({requests.length} shown of {total})</span>
                </h1>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={() => setCustombooking?.(true)}
                        className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                    >
                        Broadcast a Request
                    </button>
                </div>
            </div>

            {/* Skeleton state */}
            {isSkeleton && (
                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 animate-pulse">
                                <div className="flex justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="h-6 w-64 bg-gray-200 rounded mb-3"></div>
                                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
                                        <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
                                    </div>
                                </div>
                                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 w-5/6 bg-gray-200 rounded mb-6"></div>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-12">
                                        <div>
                                            <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-5 w-20 bg-gray-200 rounded"></div>
                                        </div>
                                        <div>
                                            <div className="h-3 w-36 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-5 w-32 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Real cards + pagination */}
            {!isSkeleton && (
                <>
                    {/* Scrollable list */}
                    <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2">
                        {requests.map((req) => {
                            const statusKey = (req?.status || '').toLowerCase().replace(' ', '_');
                            const badgeClass = statusStyles[statusKey] ?? 'bg-gray-100 text-gray-600';
                            return (
                                <div key={req.request_id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-6">
                                        {/* Title + actions */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h2 className="text-xl font-semibold text-gray-900">{req.title}</h2>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}>
                                                        {humanizeStatus(req.status)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-gray-500 text-sm gap-1">
                                                    <CiLocationOn className="text-[#00034A]" />
                                                    <span className="truncate">
                                                        {req.location || [req.city, req.state].filter(Boolean).join(', ')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {/* <button
                                                    onClick={() => setCustombooking?.(true)}
                                                    className="p-2 bg-gradient-to-r from-[#00034A] to-[#27A8E2] rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <CiEdit color="white" className="w-5 h-5" />
                                                </button> */}
                                                <button
                                                    onClick={() => handleDelete(req)}
                                                    className={`p-2 rounded-lg transition-colors ${canDelete(req) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'
                                                        }`}
                                                    title={canDelete(req) ? 'Delete' : 'Cannot delete'}
                                                >
                                                    <LuTrash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        {req?.description && (
                                            <p className="text-gray-600 mb-6 leading-relaxed">{req.description}</p>
                                        )}

                                        {/* Price + Date/Time */}
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-12">
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Proposed Price</p>
                                                    <p className="text-xl font-semibold text-gray-900">
                                                        {req.amount ? `$${parseFloat(req.amount).toFixed(2)}` : '—'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Preferred Date & Time</p>
                                                    <p className="text-lg font-medium text-gray-900">
                                                        {[req.day, req.date, req.time].filter(Boolean).join(', ')}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        req.booking_id
                                                            ? `/accept-detail/${req.booking_id}`
                                                            : `/service-detail/${req.request_id}`
                                                    )
                                                }
                                                className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-white p-3 rounded-lg hover:opacity-90 transition"
                                                title="View details"
                                            >
                                                <FaChevronRight className="w-5 h-5" />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty state (after filter) */}
                    {requests.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No service requests found matching your search.</p>
                        </div>
                    )}

                    {/* Pagination bar */}
                    {lastPage > 1 && (
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-medium text-gray-900">{shownFrom}</span>–
                                <span className="font-medium text-gray-900">{shownTo}</span> of{' '}
                                <span className="font-medium text-gray-900">{total}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={isLoading || currentPage <= 1}
                                    className={`h-9 px-3 rounded-md border text-sm transition ${currentPage <= 1
                                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    ‹ Prev
                                </button>

                                {renderPageButtons()}

                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={isLoading || currentPage >= lastPage}
                                    className={`h-9 px-3 rounded-md border text-sm transition ${currentPage >= lastPage
                                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    Next ›
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default BroadcastServiceRequests;
